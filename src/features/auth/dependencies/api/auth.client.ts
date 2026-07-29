import { config } from "@/src/lib/config/config";
import { TLoginInput, TRegisterInput } from "../schema/auth.schema";
import { clientFetch } from "@/src/lib/api/api.client";
import { bffEndpoints } from "@/src/lib/api/api.endpoint";
import { IAuthUser } from "../types/auth.types";

const authBase = { baseUrl: config.auth_base_url };

export const loginClient = (credentials: TLoginInput) =>
  clientFetch<IAuthUser>(bffEndpoints.auth.login, {
    ...authBase,
    method: "POST",
    body: credentials,
  });

export const registerClient = (payload: TRegisterInput) =>
  clientFetch<IAuthUser>(bffEndpoints.auth.register, {
    ...authBase,
    method: "POST",
    body: payload,
  });

export const logoutClient = () =>
  clientFetch(bffEndpoints.auth.logout, { ...authBase, method: "POST" });
