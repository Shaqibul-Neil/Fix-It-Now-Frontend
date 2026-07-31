// Public category row — matches backend's getAllCategories (raw Prisma row).
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
