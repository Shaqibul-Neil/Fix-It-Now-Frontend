import { getCategories } from "@/src/features/public/category/dependencies/api/category.api";
import { getTechnicians } from "@/src/features/public/technician/dependencies/api/technician.api";
import type { ICategoryListItem } from "@/src/features/public/category/dependencies/types/category.types";
import type { ITechnician } from "@/src/features/public/technician/dependencies/types/technician.types";

const HOME_TECHNICIAN_COUNT = 6;
const HOME_CATEGORY_COUNT = 6;

// The six trades with the most recent booking activity, for the index and the
// structured data underneath it.
export const getHomeCategories = async (): Promise<ICategoryListItem[]> =>
  getCategories({ sort: "trending", limit: HOME_CATEGORY_COUNT });

// Falls back to the best-rated technicians when nobody is featured yet.
export const getHomeTechnicians = async (): Promise<ITechnician[]> => {
  const featured = await getTechnicians({
    featured: true,
    sort: "top_rated",
    page: 1,
    limit: HOME_TECHNICIAN_COUNT,
  });

  if (featured.items.length > 0) return featured.items;

  const topRated = await getTechnicians({
    sort: "top_rated",
    page: 1,
    limit: HOME_TECHNICIAN_COUNT,
  });

  return topRated.items;
};
