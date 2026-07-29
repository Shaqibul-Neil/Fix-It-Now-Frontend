import { toast } from "sonner";

// Client-only: sonner needs the browser. Server Components cannot call this.

/**
 * Every message the user sees comes from the backend, so pull it off whatever
 * was thrown instead of writing our own copy.
 * clientFetch throws ApiRequestError, whose message is the backend's verbatim.
 */
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return "Something went wrong";
};

export const AppToast = {
  success: (message: string) => toast.success(message),
  info: (message: string) => toast.info(message),

  // Takes the raw error so call sites stay one line: AppToast.error(error)
  error: (error: unknown) => toast.error(getErrorMessage(error)),
};
