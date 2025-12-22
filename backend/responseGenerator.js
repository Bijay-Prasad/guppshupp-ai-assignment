import { callLLM } from "./llm.js";
import { getPersonalityPrompt } from "./personalityEngine.js";

export async function generateResponse(userMessage, memory, personality) {
    const prompt = `
${getPersonalityPrompt(personality)}

User Memory:
${JSON.stringify(memory, null, 2)}

User Message:
"${userMessage}"

Respond naturally.
`;

    return await callLLM(prompt);
}