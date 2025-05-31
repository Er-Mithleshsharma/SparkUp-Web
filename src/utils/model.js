// src/utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Correct way to access the environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;
