import { Client } from "typesense";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function seedTypesense() {
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

  const plants = JSON.parse(fs.readFileSync("plants-processed.json", "utf8"));

  for (const plant of plants) {
    await client.collections("plants").documents().create(plant);
  }

  console.log("Typesense seeded with plants");
}

if (import.meta.url === `file://${process.argv[1]}`) seedTypesense();
