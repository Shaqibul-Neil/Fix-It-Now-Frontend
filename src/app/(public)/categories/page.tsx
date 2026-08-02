import { CATEGORY_SORT } from "@/src/features/public/category/dependencies/types/category.types";
import type {
  IPublicCategoryQuery,
  TCategorySort,
} from "@/src/features/public/category/dependencies/types/category.types";
import CategoriesPage from "@/src/features/public/category/pages/CategoriesPage";

type TSearchParams = Record<string, string | string[] | undefined>;

type TRouteProps = { searchParams: Promise<TSearchParams> };

const toSingle = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function CategoriesRoute({ searchParams }: TRouteProps) {
  const params = await searchParams;

  const sort = toSingle(params.sort);
  const limit = Number(toSingle(params.limit));

  const query: IPublicCategoryQuery = {
    sort: CATEGORY_SORT.includes(sort as TCategorySort)
      ? (sort as TCategorySort)
      : undefined,
    // The API caps it at 50; anything else means "no limit".
    limit: limit > 0 && limit <= 50 ? limit : undefined,
  };

  return <CategoriesPage query={query} />;
}
