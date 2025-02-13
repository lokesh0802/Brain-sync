import axios from 'axios';
import { searchDocuments } from "../generate_vector/search_invector";


const GEMINI_API_KEY = "AIzaSyBB9Js-DrC6FlkyfcP4AYGcjNoFHGsvSoI";

if (!GEMINI_API_KEY) {
    console.error("Error: Missing GEMINI_API_KEY. Please set it in your .env file.");
    process.exit(1);
}

// export async function analyzeSearchResult(searchdata: string) {
//     try {
//         const searchResult = await searchDocuments(searchdata);

//         if (!searchResult || !searchResult.description) {
//             console.error('No valid description found in search results.');
//             return;
//         }

//         const prompt = `Provide an analysis of the following content:

//         Description: ${searchResult.description}
        
//         Please provide:
//         1. A brief summary of the content
//         2. Key points mentioned
//         3. Any notable aspects`;

//         const response = await axios.post(
//             `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
//             {
//                 contents: [{ parts: [{ text: prompt }] }]
//             },
//             { headers: { 'Content-Type': 'application/json' } }
//         );

//         // Extracting actual text response from Gemini API
//         const resultText = response.data?.candidates?.[0]?.content?.parts?.map((part: { text: string }) => part.text).join(' ') || 'No response received';

//         console.log('Search result description:', searchResult.description);
//         console.log('Gemini Analysis Result:', resultText);
//     } catch (error: any) {
//         console.error('Error analyzing search result:', error.response?.data || error.message);
//     }
// }

export async function analyzeSearchResult(searchdata: string) {
    try {
        const searchResult = await searchDocuments(searchdata);

        if (!searchResult || !searchResult.description) {
            throw new Error('No valid description found in search results.');
        }

        const prompt = `Provide an analysis of the following content:

        Description: ${searchResult.description}
        
        Please provide:
        1. A brief summary of the content
        2. Key points mentioned
        3. Any notable aspects`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const resultText = response.data?.candidates?.[0]?.content?.parts?.map((part: { text: string }) => part.text).join(' ') || 'No response received';

        // Return an object with both the search result and analysis
        return {
            originalContent: {
                description: searchResult.description,
                // Include other searchResult properties if needed
            },
            analysis: resultText
        };

    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
}