// Public category row — matches the backend's PUBLIC_CATEGORY_SELECT, which
// leaves out status and audit fields on purpose.
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}
