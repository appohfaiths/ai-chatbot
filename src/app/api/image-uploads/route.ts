import {utapi} from "@/utils/uploadThing";
import {NextResponse} from "next/server";
import {FileEsque} from "uploadthing/types";
import {pipeline} from "@huggingface/transformers";

export async function POST(req: Request, res: Response) {
//     get uploaded url from uploadthing
    const formData = await req.formData();
    const files = formData.getAll("files");
    const response = await  utapi.uploadFiles(files as unknown as FileEsque);
    const imageUrl = response[0].data?.url as string;

//     detect objects using model
    const detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
    const output = await detector(imageUrl, { threshold: 0.9 });

//     parse output
    const result : { [key: string] : number} = {}
    output.forEach(({score, label}: any) => {
        if (score > 0.85) {
            if(result[label]) {
                result [label]++;
            } else {
                result [label] = 1;
            }
        }
    })
//     return response

    return NextResponse.json(
        {
            url: imageUrl,
            labels: result
        },
        {status: 200}
    )
}