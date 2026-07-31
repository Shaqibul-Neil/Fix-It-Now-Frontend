const UNSPLASH = "https://images.unsplash.com";

// Technician profiles carry no avatar in the public API response — round
// robin a small pool of portraits so cards never render empty.
const TECHNICIAN_PHOTO_IDS = [
  "photo-1560250097-0b93528c311a",
  "photo-1500648767791-00dcc994a43e",
  "photo-1531123897727-8f129e1688ce",
  "photo-1519085360753-af0119f7cbe7",
  "photo-1607746882042-944635dfe10e",
  "photo-1573497019940-1c28c88b4f3e",
];

export const getTechnicianPhoto = (index: number, width = 800) => {
  const id = TECHNICIAN_PHOTO_IDS[index % TECHNICIAN_PHOTO_IDS.length];
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&q=80`;
};
