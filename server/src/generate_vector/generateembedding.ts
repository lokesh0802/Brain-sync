import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = "AIzaSyBB9Js-DrC6FlkyfcP4AYGcjNoFHGsvSoI";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`;


if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in .env file");
}

async function generateEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await axios.post(GEMINI_URL, {
      content: { parts: [{ text }] },
    });

    return response.data.embedding.values;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error generating embeddings:", error.response?.data || error.message);
    } else {
      console.error("Error generating embeddings:", error);
    }
    throw error;
  }
}

export { generateEmbeddings };
