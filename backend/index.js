import 'dotenv/config';
import express from "express";
import cors from "cors";
import { extractMemory } from "./memoryExtractor.js";
import { generateResponse } from "./responseGenerator.js";

import fs from "fs";
const chats = JSON.parse(fs.readFileSync(new URL("./sampleChats.json", import.meta.url), "utf8"));

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

let memoryCache = null;

app.get("/", (req, res) => {
    res.send("GuppShupp AI Backend is running.");
});

app.get("/extract-memory", async (req, res) => {
    memoryCache = await extractMemory(chats);
    res.json(memoryCache);
});

app.post("/chat", async (req, res) => {
    const { message, personality } = req.body;
    const reply = await generateResponse(message, memoryCache, personality);
    res.json({ reply });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));