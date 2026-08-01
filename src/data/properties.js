import { agents } from './agents';

// --- Deterministic seeded RNG so the dataset is stable across renders ---
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(88291);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;

const locations = [
  { city: "Malibu", country: "United States", lat: 34.0259, lng: -118.7798 },
  { city: "Beverly Hills", country: "United States", lat: 34.0736, lng: -118.4004 },
  { city: "Aspen", country: "United States", lat: 39.1911, lng: -106.8175 },
  { city: "Miami", country: "United States", lat: 25.7617, lng: -80.1918 },
  { city: "New York", country: "United States", lat: 40.7128, lng: -74.006 },
  { city: "Lake Tahoe", country: "United States", lat: 39.0968, lng: -120.0324 },
  { city: "London", country: "United Kingdom", lat: 51.5072, lng: -0.1276 },
  { city: "Edinburgh", country: "United Kingdom", lat: 55.9533, lng: -3.1883 },
  { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { city: "Nice", country: "France", lat: 43.7102, lng: 7.262 },
  { city: "Lake Como", country: "Italy", lat: 45.9847, lng: 9.2565 },
  { city: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { city: "Florence", country: "Italy", lat: 43.7696, lng: 11.2558 },
  { city: "Santorini", country: "Greece", lat: 36.3932, lng: 25.4615 },
  { city: "Mykonos", country: "Greece", lat: 37.4467, lng: 25.3289 },
  { city: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417 },
  { city: "Gstaad", country: "Switzerland", lat: 46.4667, lng: 7.2833 },
  { city: "Dubai", country: "United Arab Emirates", lat: 25.2048, lng: 55.2708 },
  { city: "Abu Dhabi", country: "United Arab Emirates", lat: 24.4539, lng: 54.3773 },
  { city: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { city: "Kyoto", country: "Japan", lat: 35.0116, lng: 135.7681 },
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { city: "Byron Bay", country: "Australia", lat: -28.643, lng: 153.6122 },
  { city: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  { city: "Marrakech", country: "Morocco", lat: 31.6295, lng: -7.9811 },
  { city: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393 },
  { city: "Barcelona", country: "Spain", lat: 41.3874, lng: 2.1686 },
  { city: "Ibiza", country: "Spain", lat: 38.9067, lng: 1.4206 },
  { city: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207 },
];

const propertyTypes = ["Villa", "Penthouse", "Mansion", "Loft", "Chalet", "Estate", "Bungalow", "Townhouse"];
const statuses = ["For Sale", "For Rent", "Sold"];

const streetNames = [
  "Ocean Ridge Drive", "Pinehurst Lane", "Cascade Court", "Aurora Boulevard", "Marble Hill Road",
  "Silverleaf Way", "Windermere Terrace", "Cobalt Cliff Road", "Amberwood Avenue", "Lantern Hill Path",
  "Sapphire Bay Drive", "Ivory Peak Trail", "Cypress Grove Lane", "Harborline Street", "Meridian Crest",
];

const imagePool = [
  "1600596542815-ffad4c1539a9", "1600585154340-be6161a56a0c", "1600607687939-ce8a6c25118c",
  "1600607687644-aac4c3eac7f4", "1600585152220-90363fe7e115", "1600566753190-17f0baa2a6c3",
  "1600047509807-ba8f99d2cdde", "1600210492486-724fe5c67fb0", "1512917774080-9991f1c4c750",
  "1560448204-e02f11c3d0e2", "1568605114967-8130f3a36994", "1613490493576-7fde63acd811",
  "1523217582562-09d0def993a6", "1519994067460-9b8fdc1c9d94", "1494526585095-c41746248156",
  "1580587771525-78b9dba3b914", "1571055107559-3e67626fa8be", "1502005229762-cf1b2da7c5d6",
  "1583608205776-bfd35f0d9f83", "1613977257363-707ba9348227", "1616486338812-3dadae4b4ace",
  "1560449017-31d0d436e6b5", "1560185893-a55cbc8c57e8", "1600566752355-35792bedcfea",
  "1600566753086-00f18fb6b3ea", "1600566753151-384129cf4e3e", "1600607688969-a5bfcd646154",
  "1615529182904-14819c35db37", "1512918728675-ed5a9ecdebfd", "1524230572899-a752b3835840",
];

const amenityPool = [
  "Infinity Pool", "Home Cinema", "Wine Cellar", "Private Dock", "Smart Home System",
  "Rooftop Terrace", "Spa & Sauna", "Wellness Gym", "Chef's Kitchen", "Guest House",
  "Panoramic Ocean View", "Heated Floors", "Electric Vehicle Charging", "Private Elevator",
  "Tennis Court", "Landscaped Garden", "Walk-in Closets", "Solar Power", "Security System",
  "Outdoor Kitchen", "Fireplace Lounge", "Art Gallery Wall", "Concierge Service", "Yoga Studio",
];

const descriptors = [
  "A masterwork of contemporary architecture", "An icon of understated luxury", "A sanctuary of light and space",
  "A rare offering for the discerning buyer", "Where minimalism meets grandeur", "A private world above the everyday",
  "Designed for effortless indoor-outdoor living", "A statement of quiet, timeless elegance",
];

function makeTitle(type, city) {
  const adjectives = ["Serene", "Radiant", "Modern", "Grand", "Hidden", "Elevated", "Coastal", "Timeless", "Sculpted", "Golden"];
  return `${pick(adjectives)} ${type} in ${city}`;
}

export const properties = Array.from({ length: 156 }, (_, i) => {
  const id = i + 1;
  const loc = pick(locations);
  const type = pick(propertyTypes);
  const bedrooms = randInt(2, 8);
  const bathrooms = Math.min(bedrooms + randInt(0, 2), 9);
  const garage = randInt(0, 4);
  const area = randInt(950, 12000);
  const basePrice = randInt(450, 28000) * 1000;
  const status = pick(statuses);
  const agent = agents[i % agents.length];
  const numImages = randInt(4, 6);
  const images = Array.from({ length: numImages }, (_, k) =>
    `https://images.unsplash.com/photo-${imagePool[(i * 3 + k) % imagePool.length]}?w=1200&h=800&fit=crop`
  );
  const shuffledAmenities = [...amenityPool].sort(() => rand() - 0.5).slice(0, randInt(6, 10));

  return {
    id,
    slug: `${type.toLowerCase()}-${loc.city.toLowerCase().replace(/\s+/g, '-')}-${id}`,
    title: makeTitle(type, loc.city),
    price: basePrice,
    location: `${streetNames[i % streetNames.length]}, ${loc.city}`,
    country: loc.country,
    city: loc.city,
    bedrooms,
    bathrooms,
    garage,
    area,
    description: `${pick(descriptors)}, this ${bedrooms}-bedroom ${type.toLowerCase()} sits within ${loc.city}, ${loc.country}, pairing ${area.toLocaleString()} sqft of considered living space with a curated palette of natural materials. Every room is oriented toward light, privacy, and the surrounding landscape, offering a residence built for both quiet daily living and effortless entertaining.`,
    images,
    type,
    status,
    agent,
    rating: (4 + rand()).toFixed(1),
    coordinates: {
      lat: loc.lat + (rand() - 0.5) * 0.08,
      lng: loc.lng + (rand() - 0.5) * 0.08,
    },
    amenities: shuffledAmenities,
    yearBuilt: randInt(1998, 2025),
    listedDaysAgo: randInt(1, 240),
    featured: rand() > 0.82,
  };
});

export const propertyTypesList = propertyTypes;
export const statusList = statuses;
export const citiesList = [...new Set(locations.map((l) => l.city))].sort();
export const countriesList = [...new Set(locations.map((l) => l.country))].sort();
