// import { QdrantClient } from "@qdrant/js-client-rest";
// import { generateEmbeddings } from "./generateembedding";

// const client = new QdrantClient({
//   url: "https://06356690-7dd0-451d-9cc4-85603b3ae31d.eu-west-2-0.aws.cloud.qdrant.io",
//   apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.nKkAMNcYym-FnjQFHGCjB8sKVq20lZfsN108XpJOt6U",
// });

// /**
//  * Converts MongoDB ObjectId to a numeric ID
//  */
// function convertObjectIdToNumber(objectId: string): number {
//   return parseInt(objectId.substring(0, 8), 16); // Convert first 8 hex chars to an integer
// }

// /**
//  * Inserts a new document into Qdrant without replacing old vectors.
//  */
// export async function insertData(newDocument: { id: string; title: string; link?: string; description: string; type: string }) {
//   try {
//     // Ensure a unique numeric ID
//     const numericId = convertObjectIdToNumber(newDocument.id);

//     // Generate embeddings
//     const vector = await generateEmbeddings(newDocument.title + " " + newDocument.description);

//     // Insert new vector
//     await client.upsert("test_collection", {
//       points: [
//         {
//           id: numericId, // Unique ID for Qdrant
//           vector,
//           payload: {
//             title: newDocument.title,
//             link: newDocument.link || "",
//             description: newDocument.description,
//             type: newDocument.type,
//           },
//         },
//       ],
//     });

//     console.log("New data successfully inserted into Qdrant!");
//   } catch (error) {
//     console.error("Error inserting data into Qdrant:", error);
//   }
// }

import { QdrantClient } from "@qdrant/js-client-rest";
import { generateEmbeddings } from "./generateembedding";

const client = new QdrantClient({
  url: "https://06356690-7dd0-451d-9cc4-85603b3ae31d.eu-west-2-0.aws.cloud.qdrant.io",
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.nKkAMNcYym-FnjQFHGCjB8sKVq20lZfsN108XpJOt6U",
});

/**
 * Converts MongoDB ObjectId to a numeric ID
 */
function convertObjectIdToNumber(objectId: string): number {
  return parseInt(objectId.substring(0, 8), 16); // Convert first 8 hex chars to an integer
}

/**
 * Inserts a new document into Qdrant without replacing old vectors.
 */
export async function insertData(newDocument: { id: string; title: string; link?: string; description: string; type: string }) {
  try {
    // Ensure a unique numeric ID
    const numericId = convertObjectIdToNumber(newDocument.id);

    // Create collection if not exists
    try {
      await client.getCollection("test_collection");
    } catch (error) {
      await client.createCollection("test_collection", {
        vectors: { size: 768, distance: "Cosine" },
      });
    }

    // Generate embeddings
    const vector = await generateEmbeddings(newDocument.title + " " + newDocument.description);
    
    // Insert new vector
    await client.upsert("test_collection", {
      points: [
        {
          id: numericId, // Unique ID for Qdrant
          vector,
          payload: {
            title: newDocument.title,
            link: newDocument.link || "",
            description: newDocument.description,
            type: newDocument.type,
          },
        },
      ],
    });

    console.log("New data successfully inserted into Qdrant!");
  } catch (error) {
    console.error("Error inserting data into Qdrant:", error);
  }
}