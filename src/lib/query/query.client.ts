import { QueryClient } from "@tanstack/react-query";
import { ApiRequestError } from "../api/api.error";

const NON_RETRYABLE_STATUS = [401, 403, 404];

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (
            error instanceof ApiRequestError &&
            NON_RETRYABLE_STATUS.includes(error.status)
          ) {
            return false;
          }
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) =>
          Math.min(1000 * 2 ** attemptIndex, 30_000),
      },
    },
  });
