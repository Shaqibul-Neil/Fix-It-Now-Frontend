import type { IUserListQuery } from "../types/user.types";

// `lists` is the prefix a mutation invalidates, `list` is the exact query.
export const userKeys = {
  admin: {
    lists: ["admin-users"] as const,
    list: (query: IUserListQuery) => ["admin-users", query] as const,
  },
};
