import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { IAdminUserRow, IUserListQuery } from "../types/user.types";

const buildQuery = ({ search, role, status, page, limit }: IUserListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) params.set("search", search);
  if (role) params.set("role", role);
  // Removed accounts have no status of their own — they arrive only when the
  // list is widened, which is what the "all" tab asks for.
  if (status === "all") params.set("includeDeleted", "true");
  else if (status) params.set("status", status);

  return `?${params.toString()}`;
};

//-----------------Admin---------------
export const getAdminUsers = (query: IUserListQuery) =>
  clientFetch<IAdminUserRow[]>(
    `${apiEndpoints.dashboard.admin.users.list}${buildQuery(query)}`,
  );
