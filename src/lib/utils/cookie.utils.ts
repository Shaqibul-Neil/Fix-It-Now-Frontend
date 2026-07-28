/**
 * Reads one cookie out of a response's Set-Cookie headers.
 * with commas and break parsing.
 */
export const getSetCookieValue = (
  headers: Headers,
  name: string,
): string | undefined => {
  const cookie = headers
    .getSetCookie()
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) return undefined;
  const pair = cookie.split(";")[0];
  return pair.slice(pair.indexOf("=") + 1);
};
