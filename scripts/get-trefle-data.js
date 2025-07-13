import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const TOKEN = process.env.TREFLE_TOKEN ?? "";
  if (!TOKEN) {
    console.error("TREFLE_TOKEN is not set in the environment variables");
    process.exit(1);
  }

  const getTrefleData = async (page = 1) => {
    const response = await fetch(
      `https://trefle.io/api/v1/plants?token=${TOKEN}&page=${page}`
    );
    const data = await response.json();
    return data;
  };

  let plantsFile;

  if (fs.existsSync("plants.json")) {
    plantsFile = JSON.parse(fs.readFileSync("plants.json", "utf8"));
  } else {
    plantsFile = [];
  }

  for (let i = 1; i <= 70; i++) {
    const data = await getTrefleData(i);
    plantsFile.push(...data.data);
    console.log(`Page ${i} processed`);
  }

  fs.writeFileSync("plants.json", JSON.stringify(plantsFile, null, 2));

  console.log("Data saved to plants.json");
  console.log(`Total plants: ${plantsFile.length}`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();