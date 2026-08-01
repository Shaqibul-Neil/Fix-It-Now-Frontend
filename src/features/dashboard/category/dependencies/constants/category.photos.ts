const UNSPLASH = "https://images.unsplash.com";

// Services carry only a category name (flattened on the backend), not the
// slug — derive the same kebab-case key the seed used to name a category.
export const toCategorySlug = (name?: string) =>
  name?.trim().toLowerCase().replace(/\s+/g, "-") ?? "";

const CATEGORY_PHOTO_IDS: Record<string, string> = {
  plumbing: "photo-1607472586893-edb57bdc0e39",
  electrical: "photo-1621905251189-08b45d6a269e",
  cleaning: "photo-1581578731548-c64695cc6952",
  painting: "photo-1562259949-e8e7689d7828",
  "ac-repair": "photo-1614624532983-4ce03382d63d",
  carpentry: "photo-1503387762-592deb58ef4e",
  "appliance-repair": "photo-1558618666-fcd25c85cd64",
};

const FALLBACK_PHOTO_ID = "photo-1621905251189-08b45d6a269e";

export const getCategoryPhoto = (slug: string, width = 1200) =>
  `${UNSPLASH}/${CATEGORY_PHOTO_IDS[slug] ?? FALLBACK_PHOTO_ID}?auto=format&fit=crop&w=${width}&q=80`;
