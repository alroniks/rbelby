# ADR 0002: Client-Side Filtering, State Management, and History

## Context

As we build features like the Events Directory (Spec 012) and Global Search (Spec 013), we need to handle state changes (e.g., active filters, search queries) dynamically on the client without relying on heavyweight frameworks like React. We must adhere to the vanilla JS requirement stated in the Constitution.

## Decision

1. **State Management**: We will use **Nano Stores** (`nanostores`), which is Astro's officially recommended framework-agnostic state manager. It provides tiny, fast, and mature reactivity without violating our "No React" constraint. We have created a wrapper function in `src/plugins/state.ts` (`createUrlSyncedStore`).

2. **Browser History & URL Sync**: The wrapper utility extends the Nano Store map to automatically synchronize specific state keys with the URL search parameters. This uses `window.history.replaceState` to update the URL silently, preserving a clean history and ensuring users can share links with active filters without breaking the back button.

3. **DOM Updates**: On state change, subscribed Vanilla JS functions will query the necessary DOM elements (e.g., `document.querySelectorAll('[data-event-item]')`) and toggle a `hidden` class based on whether the item matches the current state.

4. **Zero-Result States**:
   - A dedicated "empty state" container (`<div id="empty-state" class="hidden">...</div>`) must be present on pages with filtering.
   - During DOM updates, the script counts the number of visible items.
   - If `visibleCount === 0`, the script removes the `hidden` class from the empty state container and hides the list container.
   - The empty state UI should contain a clear message (e.g., "No events match your criteria") and a button to "Clear all filters" which resets the store state.

## Status

Accepted
