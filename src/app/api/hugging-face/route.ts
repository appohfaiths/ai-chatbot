import {NextResponse, NextRequest} from "next/server";
import {inference} from "@/app/utils/huggingFace";
import fs from "fs/promises"
import path from "node:path";
import {parse} from "node:url";

export async function POST(request: NextRequest) {
    const {query} = parse(request.url, true);
    const type = query.type;

    const formData = await request.formData();

    try {
        // chat completion
        if (type === "completion") {
            const message = formData.get("message");

            const out = await inference.chatCompletion({
                model: "mistralai/Mistral-7B-Instruct-v0.2",
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ],
                max_tokens: 1000,
            });
            console.log(out.choices[0].message);

            return NextResponse.json(
                {message: out.choices[0].message},
                {status: 200}
            )
        }

    //     translation
        if (type === "translation") {
            const text = formData.get("text");

            const out = await inference.translation({
                model: "t5-base",
                inputs: text as string
            })

            console.log(out);
            return NextResponse.json(
                {message: out},
                {status: 200}
            )
        }
    //     image to text
        if (type === "image-to-text") {
            const imageBlob = formData.get("image");
            if (!imageBlob) throw new Error("No image provided");

            const out = await  inference.imageToText({
                data: imageBlob as Blob,
                model: "nlpconnect/vit-gpt2-image-captioning",
            })

            console.log(out)
            return NextResponse.json(
                {message: out},
                {status: 200}
            )
        }
    //     text to image
        if (type === "text-to-image") {
            const prompt = formData.get("prompt");
            if (!prompt) throw new Error("No text provided");

            const out = await inference.textToImage({
                model: "stabilityai/stable-diffusion-xl-base-1.0",
                inputs: prompt as string,
                parameters: {
                    negative_prompt: "blurry"
                }
            })

            console.log(out)

            const buffer = Buffer.from(await out.arrayBuffer());
            const imagePath = path.join(
                process.cwd(),
                "public",
                "images",
                "generated-image.png"
            )
            await fs.writeFile(imagePath, buffer);

            const baseUrl = "http://localhost:3000"
            const imageUrl = `${baseUrl}/images/generated-image.png`

            return NextResponse.json(
                {message: imageUrl},
                {status: 200}
            )
        }
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            {error: error},
            {status: 500}
        )
    }
}