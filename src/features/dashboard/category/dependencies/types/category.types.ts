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

export interface ICategoryListQuery {
  search?: string;
  page: number;
  limit: number;
}

export interface ICreateCategoryPayload {
  name: string;
  description?: string;
  isActive: boolean;
}

export type IUpdateCategoryPayload = Partial<ICreateCategoryPayload>;

// What the category panel needs from whichever row opened it. `id` set means
// the panel edits instead of creating.
export interface ICategoryFormTarget {
  id?: string;
  name?: string;
  description?: string | null;
  isActive?: boolean;
}
