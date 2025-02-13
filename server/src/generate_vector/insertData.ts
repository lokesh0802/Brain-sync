
// import { QdrantClient } from "@qdrant/js-client-rest";
// import { generateEmbeddings } from "./generateembedding";

// const client = new QdrantClient({
//   url: "https://ca9fe044-08b1-4749-b85d-01b3973f4f9b.us-east4-0.gcp.cloud.qdrant.io:6333",
//   apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwiZXhwIjoxNzQ3MjAyOTE2fQ.0ItvpUUH1F97VcbES3uvj5YwrOf99YzG-kV8nlmRSpc",
// });


// export async function insertData(newDocument: { id: number; title: string; link: string; description: string }) {
//   try {
//     // Check if the collection exists
//     const collections = await client.getCollections();
//     const collectionExists = collections.collections.some(
//       (collection: { name: string }) => collection.name === "test_collection"
//     );

//     // Create collection if it does not exist
//     if (!collectionExists) {
//       await client.createCollection("test_collection", {
//         vectors: { size: 768, distance: "Cosine" },
//       });
//       console.log("Collection created successfully!");
//     }

//     // Generate embeddings for the new document
//     const vector = await generateEmbeddings(newDocument.title + " " + newDocument.description);

//     // Prepare the data point for insertion
//     const point = {
//       id: newDocument.id,
//       vector,
//       payload: {
//         title: newDocument.title,
//         link: newDocument.link,
//         description: newDocument.description,
//       },
//     };

//     // Insert the new data into Qdrant
//     await client.upsert("test_collection", { points: [point] });
//     console.log("New data successfully inserted into Qdrant!");
//   } catch (error) {
//     console.error("Error inserting data into Qdrant:", error);
//   }
// }

import { QdrantClient } from "@qdrant/js-client-rest";
import { generateEmbeddings } from "./generateembedding";

const client = new QdrantClient({
  url: "https://ca9fe044-08b1-4749-b85d-01b3973f4f9b.us-east4-0.gcp.cloud.qdrant.io:6333",
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwiZXhwIjoxNzQ3MjAyOTE2fQ.0ItvpUUH1F97VcbES3uvj5YwrOf99YzG-kV8nlmRSpc",
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
export async function insertData(newDocument: { id: string; title: string; link: string; description: string }) {
  try {
    // Ensure a unique numeric ID
    const numericId = convertObjectIdToNumber(newDocument.id);

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
            link: newDocument.link,
            description: newDocument.description,
          },
        },
      ],
    });

    console.log("New data successfully inserted into Qdrant!");
  } catch (error) {
    console.error("Error inserting data into Qdrant:", error);
  }
}
