import { QdrantClient } from "@qdrant/js-client-rest";
import { generateEmbeddings } from "../generate_vector/generateembedding";

const client = new QdrantClient({
  url: "https://1553558d-e717-4698-b415-3c96d3b78030.us-west-2-0.aws.cloud.qdrant.io",
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.BXKR8ns4agndmsCK5Hbqdt_tuNtAOiMHUUIWLiEFR2c",
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



