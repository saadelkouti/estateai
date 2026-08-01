const agentPhotoIds = [
  "1494790108377-be9c29b29330",
  "1500648767791-00dcc994a43e",
  "1517841905240-472988babdf9",
  "1519345182560-3f2917c472ef",
  "1524504388940-b1c1722653e1",
  "1531123897727-8f129e1688ce",
  "1544005313-94ddf0286df2",
  "1552058544-f2b08422138a",
  "1558203728-00f45181dd84",
  "1573497019940-1c28c88b4f3e",
  "1580489944761-15a19d654956",
  "1599566150163-29194dcaad36",
  "1607990281513-2c110a25bd8c",
  "1610186287406-52ba26b0490b",
  "1614289371518-722f2615943d",
];

const firstNames = ["Isabella", "Marcus", "Sofia", "James", "Amara", "Lucas", "Elena", "Noah", "Camille", "Daniel", "Priya", "Julian", "Naomi", "Rafael", "Chloe"];
const lastNames = ["Whitfield", "Kensington", "Alvarez", "Chen", "Okafor", "Beaumont", "Nakamura", "Sinclair", "Rossi", "Dubois", "Malhotra", "Ferreira", "Larsson", "Castillo", "Moreau"];
const specialities = [
  "Luxury Waterfront Estates",
  "Urban Penthouses",
  "Historic Manor Homes",
  "New Development Condos",
  "Countryside Villas",
  "Ultra-Prime Residences",
  "Mountain Retreats",
  "Investment Portfolios",
];

export const agents = firstNames.map((first, i) => {
  const last = lastNames[i];
  return {
    id: `agent-${i + 1}`,
    name: `${first} ${last}`,
    photo: `https://images.unsplash.com/photo-${agentPhotoIds[i % agentPhotoIds.length]}?w=400&h=400&fit=crop&crop=faces`,
    experience: 4 + ((i * 3) % 21),
    speciality: specialities[i % specialities.length],
    rating: (4.5 + ((i % 5) * 0.1)).toFixed(1),
    dealsClosed: 60 + ((i * 17) % 240),
    bio: `${first} has spent over ${4 + ((i * 3) % 21)} years guiding discerning clients through ${specialities[i % specialities.length].toLowerCase()}, known for meticulous negotiation and a quiet, white-glove approach.`,
    phone: `+1 (415) 555-0${100 + i}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@estateai.com`,
  };
});
