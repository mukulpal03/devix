const adjectives = [
  "swift", "vibrant", "mystic", "rapid", "bold",
  "bright", "silent", "sparkling", "cosmic", "nimble",
  "stellar", "radiant", "zenith", "quantum", "neon"
];

const nouns = [
  "project", "app", "workspace", "sandbox", "env",
  "dev", "code", "lab", "hub", "node",
  "flux", "wave", "pulse", "core", "atlas"
];

export const generateRandomName = (): string => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${adj}-${noun}-${num}`;
};
