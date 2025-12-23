import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

function cleanJSON(text) {
    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/```/g, "")
        .trim();
}

export async function callLLM(prompt) {
    const models = [
        "gemini-2.5-flash",       // try first (best, but tiny quota)
        "gemini-2.5-flash-lite",
        "gemini-3-pro-preview",   // stable fallback (WORKS)
    ];

    let lastError = null;

    for (const model of models) {
        try {
            console.log(`Trying model: ${model}`);

            const response = await ai.models.generateContent({
                model,
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.4,
                    maxOutputTokens: 1000,
                },
            });

            const rawText = response.text;
            const cleanedText = cleanJSON(rawText);

            try {
                return JSON.parse(cleanedText);
            } catch {
                return cleanedText;
            }

        } catch (error) {
            lastError = error;

            if (error.status === 429) {
                console.warn(`Rate limited on ${model}, trying fallback...`);
                continue;
            }

            console.warn(`Model ${model} failed: ${error.message}`);
        }
    }

    console.error("All Gemini models failed:", lastError);
    throw new Error("LLM unavailable (Gemini quota/model issue).");
}
