import { useSyncExternalStore } from "react";

/**
 * Retorna `true` somente no client, após a hidratação.
 * Seguro para SSR, sem useEffect e sem warnings de ESLint.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {}, // subscribe (noop)
    () => true, // client snapshot
    () => false, // server snapshot
  );
}
