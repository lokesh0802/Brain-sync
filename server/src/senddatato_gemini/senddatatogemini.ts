import axios from 'axios';
import { searchDocuments } from './search';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables


const GEMINI_API_KEY = "AIzaSyBB9Js-DrC6FlkyfcP4AYGcjNoFHGsvSoI";

if (!GEMINI_API_KEY) {
    console.error("Error: Missing GEMINI_API_KEY. Please set it in your .env file.");
    process.exit(1);
}

export async function analyzeSearchResult(query: string) {
    try {
        const searchResult = await searchDocuments(query);

        if (!searchResult || !searchResult.description) {
            console.error('No valid description found in search results.');
            return;
        }

//         const prompt = `Analyze the following content and provide a structured response:

// Description: ${searchResult.description}

// Response format:
// 1. Brief Summary: Provide a concise summary of the content in 2-3 sentences.
// 2. Key Points: List the most important points covered in the content.
// 3. Notable Aspects: Highlight any unique, interesting, or significant aspects of the content.
// 4. Additional Insights (if applicable): Provide any deeper insights, interpretations, or related information that could enhance understanding.`;
const prompt = `Summarize the following content in 2-3 sentences:\n\nDescription: ${searchResult.description}`;



        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        // Extracting actual text response from Gemini API
        const resultText = response.data?.candidates?.[0]?.content?.parts?.map((part: { text: string }) => part.text).join(' ') || 'No response received';

        // console.log('Search result description:', searchResult.description);
        // console.log('Gemini Analysis Result:', resultText);
        return {
            originalDescription: searchResult.description,
            analysis: resultText
        };
    } catch (error: any) {
        console.error('Error analyzing search result:', error.response?.data || error.message);
    }
}

// analyzeSearchResult();
