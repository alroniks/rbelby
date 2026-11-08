import { map } from 'nanostores';

/**
 * Standardized Vanilla JS State Management using Nano Stores
 *
 * We use `nanostores` (Astro's recommended framework-agnostic state manager)
 * for the core reactivity. This wrapper extends a map store to automatically
 * sync specified keys with the browser's URL search parameters.
 */

export function createUrlSyncedStore<T extends Record<string, any>>(
  initialState: T,
  keysToSync: (keyof T)[]
) {
  // Create a Nano Store map
  const store = map<T>(initialState);

  if (typeof window !== 'undefined') {
    // 1. Read from URL on initialization
    const url = new URL(window.location.href);
    const updates: Partial<T> = {};

    keysToSync.forEach((key) => {
      const val = url.searchParams.get(key as string);
      if (val !== null) {
        // Simple type coercion based on initial state type
        const initialVal = initialState[key];
        if (typeof initialVal === 'number') {
          updates[key] = Number(val) as any;
        } else if (typeof initialVal === 'boolean') {
          updates[key] = (val === 'true') as any;
        } else {
          updates[key] = val as any;
        }
      }
    });

    if (Object.keys(updates).length > 0) {
      store.set({ ...store.get(), ...updates });
    }

    // 2. Write to URL on state change silently (replaceState)
    store.subscribe((newState: Readonly<T>) => {
      const newUrl = new URL(window.location.href);
      keysToSync.forEach((key) => {
        const val = newState[key];
        if (val !== undefined && val !== null && val !== '') {
          newUrl.searchParams.set(key as string, String(val));
        } else {
          newUrl.searchParams.delete(key as string);
        }
      });
      window.history.replaceState({}, '', newUrl);
    });
  }

  return store;
}
