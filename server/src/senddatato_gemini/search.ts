import { QdrantClient } from "@qdrant/js-client-rest";
import { generateEmbeddings } from "../generate_vector/generateembedding";

// Match the URL and API key with insertData.ts
const client = new QdrantClient({
  url: "https://06356690-7dd0-451d-9cc4-85603b3ae31d.eu-west-2-0.aws.cloud.qdrant.io",
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.nKkAMNcYym-FnjQFHGCjB8sKVq20lZfsN108XpJOt6U",
});

export async function searchDocuments(query: string) {
  const queryVector = await generateEmbeddings(query);
  const searchResults = await client.search("test_collection", {
    vector: queryVector,
    limit: 1,
  });
  return searchResults[0]?.payload || null;
}