import * as React from "react";

const MOBILE_BREAKPOINT = 768;

const getQuery = () =>
  window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

const subscribe = (onChange: () => void) => {
  const query = getQuery();
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

// shadcn ships this as useState + useEffect, which sets state during the
// effect and costs an extra render. useSyncExternalStore reads the media query
// directly and returns false on the server, so the markup still matches.
export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => getQuery().matches,
    () => false,
  );
}
