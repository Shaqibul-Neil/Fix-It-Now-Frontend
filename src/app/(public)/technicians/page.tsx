import {
  PRICE_BUCKET,
  TECHNICIAN_SORT,
} from "@/src/features/public/technician/dependencies/types/technician.types";
import type {
  IPublicTechnicianQuery,
  TPriceBucket,
  TTechnicianSort,
} from "@/src/features/public/technician/dependencies/types/technician.types";
import TechniciansPage from "@/src/features/public/technician/pages/TechniciansPage";
import { DEFAULT_PAGE_SIZE } from "@/src/lib/constant/constant";

type TSearchParams = Record<string, string | string[] | undefined>;

type TRouteProps = { searchParams: Promise<TSearchParams> };

const toList = (value: string | string[] | undefined) => {
  if (!value) return undefined;
  return Array.isArray(value) ? value : [value];
};

const toSingle = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const isOn = (value: string | string[] | undefined) =>
  toSingle(value) === "true" || undefined;

export default async function TechniciansRoute({ searchParams }: TRouteProps) {
  const params = await searchParams;

  const sort = toSingle(params.sort);
  const buckets = toList(params.priceBuckets)?.filter(
    (bucket): bucket is TPriceBucket =>
      PRICE_BUCKET.includes(bucket as TPriceBucket),
  );

  const query: IPublicTechnicianQuery = {
    search: toSingle(params.search),
    city: toList(params.city),
    categoryIds: toList(params.categoryIds),
    skills: toList(params.skills),
    priceBuckets: buckets,
    minRating: toSingle(params.minRating),
    sort: TECHNICIAN_SORT.includes(sort as TTechnicianSort)
      ? (sort as TTechnicianSort)
      : undefined,
    acceptingClients: isOn(params.acceptingClients),
    eveningAvailable: isOn(params.eveningAvailable),
    weekendAvailable: isOn(params.weekendAvailable),
    emergencyService: isOn(params.emergencyService),
    featured: isOn(params.featured),
    page: Number(toSingle(params.page)) || 1,
    limit: Number(toSingle(params.limit)) || DEFAULT_PAGE_SIZE,
  };

  // Rebuilt from the raw params so pagination links keep every active filter.
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((entry) => urlParams.append(key, entry));
    } else {
      urlParams.set(key, value);
    }
  });

  return <TechniciansPage query={query} searchParams={urlParams} />;
}
