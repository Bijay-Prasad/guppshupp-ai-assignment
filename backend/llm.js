import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Generic LLM caller
 * - Used by memory extraction, personality engine, and response generation
 * - Returns JSON if parsable, otherwise plain text
 */

function cleanJSON(text) {
    // Remove ```json and ``` wrappers if present
    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
}

export async function callLLM(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
            generationConfig: {
                temperature: 0.4,        // stable memory extraction
                maxOutputTokens: 1000,
            },
        });

        const rawText = response.text;
        const cleanedText = cleanJSON(rawText);

        // Safe JSON parsing (important for memory module)
        try {
            return JSON.parse(cleanedText);
        } catch {
            return cleanedText;
        }
    } catch (error) {
        console.error("Gemini LLM Error:", error);
        throw new Error("Failed to generate Gemini response");
    }
}