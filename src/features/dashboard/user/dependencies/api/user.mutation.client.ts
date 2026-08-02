import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type { IUpdateUserStatusPayload } from "../types/user.types";

//-----------------Admin---------------
export const updateUserStatus = (
  id: string,
  payload: IUpdateUserStatusPayload,
) =>
  clientFetch<{ id: string }>(apiEndpoints.dashboard.admin.users.status(id), {
    method: "PATCH",
    body: payload,
  });

export const deleteUser = (id: string) =>
  clientFetch<{ id: string }>(apiEndpoints.dashboard.admin.users.remove(id), {
    method: "DELETE",
  });

export const restoreUser = (id: string) =>
  clientFetch<{ id: string }>(apiEndpoints.dashboard.admin.users.restore(id), {
    method: "PATCH",
  });
