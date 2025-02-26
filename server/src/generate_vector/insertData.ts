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
export async function insertData(newDocument: { id: string; title: string; link?: string; description: string; type: string }) {
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
