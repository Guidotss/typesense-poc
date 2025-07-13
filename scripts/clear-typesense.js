import { Client } from "typesense";
import dotenv from "dotenv";
dotenv.config();

async function clearTypesense() {
  const client = new Client({
    nodes: [
      {
        host: process.env.TYPESENSE_HOST || "localhost",
        port: parseInt(process.env.TYPESENSE_PORT || "8108"),
        protocol: process.env.TYPESENSE_PROTOCOL || "http",
      },
    ],
    apiKey: process.env.TYPESENSE_API_KEY || "your-api-key",
    connectionTimeoutSeconds: 2,
  });

  try {
    await client.collections("plants").delete();
    console.log("Collection 'plants' deleted successfully");
  } catch (error) {
    if (error.message.includes("Not Found")) {
      console.log("Collection 'plants' does not exist, nothing to delete");
    } else {
      console.error("Error deleting collection:", error);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) clearTypesense(); 