import {HfInference} from "@huggingface/inference";

const HF_TOKEN = "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"

export const inference = new HfInference(HF_TOKEN);