import plantsData from "../plants.json" assert { type: "json" };
import fs from "fs";
import path from "path";

const plantSynonyms = {
  oak: ["roble", "quercus", "encina"],
  pine: ["pino", "pinus", "abeto"],
  tree: ["árbol", "planta", "vegetal"],
  flower: ["flor", "bloom", "blossom"],
  leaf: ["hoja", "foliage", "verde"],
  plant: ["planta", "vegetal", "especie"],
  garden: ["jardín", "huerto", "parque"],
  indoor: ["interior", "casa", "hogar"],
  outdoor: ["exterior", "exterior", "jardín"],
  succulent: ["suculenta", "crasa", "cactus"],
  cactus: ["cactus", "suculenta", "desierto"],
  fern: ["helecho", "filicophyta"],
  palm: ["palmera", "palma", "arecaceae"],
  bamboo: ["bambú", "bambusa"],
  rose: ["rosa", "rosal", "flor"],
  lily: ["lirio", "lilium", "flor"],
  tulip: ["tulipán", "tulipa", "flor"],
  daisy: ["margarita", "bellis", "flor"],
  sunflower: ["girasol", "helianthus", "flor"],
  lavender: ["lavanda", "lavandula", "aromática"],
  mint: ["menta", "mentha", "aromática"],
  basil: ["albahaca", "ocimum", "aromática"],
  thyme: ["tomillo", "thymus", "aromática"],
  rosemary: ["romero", "rosmarinus", "aromática"],
  sage: ["salvia", "salvia", "aromática"],
  oregano: ["orégano", "origanum", "aromática"],
  parsley: ["perejil", "petroselinum", "aromática"],
  cilantro: ["cilantro", "coriandrum", "aromática"],
  dill: ["eneldo", "anethum", "aromática"],
  chives: ["cebollín", "allium", "aromática"],
  garlic: ["ajo", "allium", "aromática"],
  onion: ["cebolla", "allium", "aromática"],
  tomato: ["tomate", "solanum", "hortaliza"],
  pepper: ["pimiento", "capsicum", "hortaliza"],
  cucumber: ["pepino", "cucumis", "hortaliza"],
  lettuce: ["lechuga", "lactuca", "hortaliza"],
  spinach: ["espinaca", "spinacia", "hortaliza"],
  kale: ["col", "brassica", "hortaliza"],
  carrot: ["zanahoria", "daucus", "hortaliza"],
  potato: ["papa", "solanum", "hortaliza"],
  "sweet potato": ["batata", "ipomoea", "hortaliza"],
  corn: ["maíz", "zea", "cereal"],
  wheat: ["trigo", "triticum", "cereal"],
  rice: ["arroz", "oryza", "cereal"],
  barley: ["cebada", "hordeum", "cereal"],
  oats: ["avena", "avena", "cereal"],
  rye: ["centeno", "secale", "cereal"],
  sorghum: ["sorgo", "sorghum", "cereal"],
  millet: ["mijo", "panicum", "cereal"],
  quinoa: ["quinua", "chenopodium", "pseudocereal"],
  amaranth: ["amaranto", "amaranthus", "pseudocereal"],
  buckwheat: ["trigo sarraceno", "fagopyrum", "pseudocereal"],
  teff: ["teff", "eragrostis", "cereal"],
  spelt: ["espelta", "triticum", "cereal"],
  kamut: ["kamut", "triticum", "cereal"],
  emmer: ["escanda", "triticum", "cereal"],
  einkorn: ["einkorn", "triticum", "cereal"],
  durum: ["trigo duro", "triticum", "cereal"],
  "bread wheat": ["trigo pan", "triticum", "cereal"],
  "club wheat": ["trigo club", "triticum", "cereal"],
  "Polish wheat": ["trigo polaco", "triticum", "cereal"],
  "Persian wheat": ["trigo persa", "triticum", "cereal"],
  "Indian dwarf wheat": ["trigo enano indio", "triticum", "cereal"],
  "Urartu wheat": ["trigo urartu", "triticum", "cereal"],
  "wild emmer": ["escanda silvestre", "triticum", "cereal"],
  "wild einkorn": ["einkorn silvestre", "triticum", "cereal"],
  "wild durum": ["trigo duro silvestre", "triticum", "cereal"],
  "wild bread wheat": ["trigo pan silvestre", "triticum", "cereal"],
  "wild club wheat": ["trigo club silvestre", "triticum", "cereal"],
  "wild Polish wheat": ["trigo polaco silvestre", "triticum", "cereal"],
  "wild Persian wheat": ["trigo persa silvestre", "triticum", "cereal"],
  "wild Indian dwarf wheat": [
    "trigo enano indio silvestre",
    "triticum",
    "cereal",
  ],
  "wild Urartu wheat": ["trigo urartu silvestre", "triticum", "cereal"],
};

function generateSynonyms(plant) {
  const synonyms = [];

  if (plant.common_name) {
    const commonNameLower = plant.common_name.toLowerCase();
    for (const [english, spanish] of Object.entries(plantSynonyms)) {
      if (
        commonNameLower.includes(english) ||
        spanish.some((s) => commonNameLower.includes(s))
      ) {
        synonyms.push(...spanish);
        synonyms.push(english);
      }
    }
  }

  if (plant.scientific_name) {
    const scientificNameLower = plant.scientific_name.toLowerCase();
    for (const [english, spanish] of Object.entries(plantSynonyms)) {
      if (
        scientificNameLower.includes(english) ||
        spanish.some((s) => scientificNameLower.includes(s))
      ) {
        synonyms.push(...spanish);
        synonyms.push(english);
      }
    }
  }

  if (plant.synonyms && Array.isArray(plant.synonyms)) {
    synonyms.push(...plant.synonyms);
  }

  return [...new Set(synonyms)];
}

function generateSearchText(plant) {
  const searchParts = [];

  if (plant.common_name) searchParts.push(plant.common_name);
  if (plant.scientific_name) searchParts.push(plant.scientific_name);
  if (plant.family_common_name) searchParts.push(plant.family_common_name);
  if (plant.family) searchParts.push(plant.family);
  if (plant.genus) searchParts.push(plant.genus);
  if (plant.description) searchParts.push(plant.description);

  const synonyms = generateSynonyms(plant);
  searchParts.push(...synonyms);

  return searchParts.join(" ").toLowerCase();
}

function generateVariedData(plant, index) {
  const careLevels = ["Fácil", "Moderado", "Avanzado"];
  const lightRequirements = ["Luz Directa", "Luz Indirecta", "Sombra Parcial", "Sombra Total"];
  const origins = ["Nativo", "Importado", "Híbrido", "Cultivado"];
  const sizes = ["Pequeño", "Mediano", "Grande", "Extra Grande"];
  
  const careLevel = careLevels[index % careLevels.length];
  const lightRequirement = lightRequirements[index % lightRequirements.length];
  const origin = origins[index % origins.length];
  const size = sizes[index % sizes.length];
  
  const price = Math.floor(Math.random() * 100) + 10;
  
  const stock = Math.floor(Math.random() * 500) + 50;
  
  return {
    care_level: careLevel,
    light_requirements: lightRequirement,
    origin: origin,
    size: size,
    price: price,
    stock: stock
  };
}

const processedPlants = plantsData.map((plant, index) => {
  const cleanPlant = {};
  for (const [key, value] of Object.entries(plant)) {
    if (value !== null && value !== undefined) {
      cleanPlant[key] = value;
    }
  }
  
  const variedData = generateVariedData(plant, index);
  
  return {
    ...cleanPlant,
    id: String(plant.id),
    synonyms: generateSynonyms(plant),
    search_text: generateSearchText(plant),
    category: plant.family_common_name || plant.family || "Plantas",
    care_level: variedData.care_level,
    light_requirements: variedData.light_requirements,
    origin: variedData.origin,
    price: variedData.price,
    stock: variedData.stock,
    size: variedData.size,
    description:
      plant.bibliography ||
      `Planta ${plant.common_name || plant.scientific_name} de la familia ${
        plant.family || "desconocida"
      }`,
  };
});

const outputPath = path.join(process.cwd(), "plants-processed.json");

fs.writeFileSync(outputPath, JSON.stringify(processedPlants, null, 2));

console.log(`Datos procesados guardados en: ${outputPath}`);
console.log(`Total de plantas procesadas: ${processedPlants.length}`);
console.log(`Ejemplo de planta procesada:`, processedPlants[0]);

const careLevelStats = {};
const lightStats = {};
const originStats = {};
const sizeStats = {};

processedPlants.forEach(plant => {
  careLevelStats[plant.care_level] = (careLevelStats[plant.care_level] || 0) + 1;
  lightStats[plant.light_requirements] = (lightStats[plant.light_requirements] || 0) + 1;
  originStats[plant.origin] = (originStats[plant.origin] || 0) + 1;
  sizeStats[plant.size] = (sizeStats[plant.size] || 0) + 1;
});

console.log("\nEstadísticas de datos generados:");
console.log("Niveles de cuidado:", careLevelStats);
console.log("Requerimientos de luz:", lightStats);
console.log("Orígenes:", originStats);
console.log("Tamaños:", sizeStats);
