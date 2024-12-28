import { NextResponse } from 'next/server';
import PipelineSingleton from './pipeline';
import {inference} from "@/app/utils/huggingFace";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const prompt = formData.get('prompt') as string;
        const max_length = formData.get('max_length') ? parseInt(formData.get('max_length') as string) : 200;
        const temperature = formData.get('temperature') ? parseFloat(formData.get('temperature') as string) : 0.7;
        console.log(prompt);

        if (!prompt) {
            return NextResponse.json({
                error: 'Missing prompt parameter',
            }, { status: 400 });
        }

        // Get the text generation pipeline
        // const generator = await PipelineSingleton.getInstance();
        //
        // // Generate the text
        // const result = await generator(prompt, {
        //     max_length: max_length,
        //     temperature: temperature,
        //     top_p: 0.9,
        //     top_k: 50,
        //     num_return_sequences: 1,
        //     do_sample: true,
        //     pad_token_id: generator.tokenizer.pad_token_id,
        //     eos_token_id: generator.tokenizer.eos_token_id,
        //     truncation: true,
        // });
        //
        // // Extract and clean the generated text
        // const generatedText = result[0].generated_text.trim();

        const out = await inference.textGeneration({
            model: "appohfaiths/Llama-Ghanaba-AI",
            inputs: prompt,
            max_length: max_length,
            temperature: temperature,
            top_p: 0.9,
            top_k: 50,
            num_return_sequences: 1,
            do_sample: true,
            pad_token_id: 50256,
            eos_token_id: 50256,
            truncation: true,
        })

        const generatedText = out['generated_text'];

        return NextResponse.json({
            prompt: prompt,
            generated_text: generatedText,
            // You might want to include additional metadata
            metadata: {
                max_length,
                temperature,
                model: "appohfaiths/Llama-Ghanaba-AI"
            }
        });

    } catch (error) {
        console.error('Generation error:', error);
        return NextResponse.json({
            error: 'Failed to generate text',
            details: error.message
        }, { status: 500 });
    }
}