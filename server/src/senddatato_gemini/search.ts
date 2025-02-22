import { QdrantClient } from "@qdrant/js-client-rest";
import { generateEmbeddings } from "../generate_vector/generateembedding";

const client = new QdrantClient({
  url: "https://ca9fe044-08b1-4749-b85d-01b3973f4f9b.us-east4-0.gcp.cloud.qdrant.io:6333",
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwiZXhwIjoxNzQ3MjAyOTE2fQ.0ItvpUUH1F97VcbES3uvj5YwrOf99YzG-kV8nlmRSpc",
});

export async function searchDocuments(query: string) {
  const queryVector = await generateEmbeddings(query);
  const searchResults = await client.search("test_collection", {
    vector: queryVector,
    limit: 1,  // Changed to 1 from 3
  });

  // Return only the first result's payload
  return searchResults[0]?.payload || null;
}



