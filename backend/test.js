import 'dotenv/config';
import { callLLM } from "./llm.js";

const res = await callLLM(`
Extract memory as JSON.
User says: "I feel lonely at night and prefer calm conversations."
`);
console.log(res);