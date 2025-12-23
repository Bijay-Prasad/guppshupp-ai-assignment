const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

// Types
export interface MemoryData {
  preferences: string[];
  emotional_patterns: string[];
  facts: string[];
}

export interface ChatRequest {
  message: string;
  personality: "mentor" | "witty" | "therapist";
}

export interface ChatResponse {
  reply: string;
}

// Mock Data for Demo (fallback if backend is down)
const MOCK_MEMORY: MemoryData = {
  preferences: ["Likes dark mode", "Prefers concise answers", "Interested in AI"],
  emotional_patterns: ["Curious", "Optimistic", "Seeker of knowledge"],
  facts: ["User is a developer", "Based in India", "Working on a demo"]
};

// API Client
export const api = {
  extractMemory: async (): Promise<MemoryData> => {
    try {
      const res = await fetch(`${API_BASE}/extract-memory`);
      if (!res.ok) throw new Error("Failed to fetch memory");
      return await res.json();
    } catch (error) {
      console.warn("API Error, using mock data:", error);
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_MEMORY;
    }
  },

  chat: async (data: ChatRequest): Promise<ChatResponse> => {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return await res.json();
    } catch (error) {
       console.warn("API Error, using mock response:", error);
       await new Promise(resolve => setTimeout(resolve, 800));
       return { reply: `[Mock ${data.personality}] This is a simulated response because the backend is unreachable. You said: "${data.message}"` };
    }
  }
};
