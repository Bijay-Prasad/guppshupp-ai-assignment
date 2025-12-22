import { callLLM } from "./llm.js";

export async function extractMemory(chats) {
    const prompt = `
You extract long-term memory from user chats.

Extract:
1. preferences
2. emotional_patterns
3. facts

Rules:
- Use only information explicitly stated
- Be concise
- Return ONLY raw JSON
- Do NOT wrap in markdown
- Do NOT add explanations

Conversation:
${chats.map(c => c.content).join("\n")}

Output format:
{
  "preferences": [],
  "emotional_patterns": [],
  "facts": []
}
`;

    return await callLLM(prompt);
}