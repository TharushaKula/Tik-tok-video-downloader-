// Small localStorage helpers shared by every feature that persists state in
// the browser. Also carries the one-time migration from the SnapLoad-era
// "snapload:*" keys to "clipkoala:*", so nobody loses their saved videos,
// history, or preferences because the product got a new name.
import { LEGACY_STORAGE_PREFIX, STORAGE_PREFIX } from "./site";

export function storageKey(name: string): string {
  return `${STORAGE_PREFIX}${name}`;
}

let migrated = false;

/**
 * Copy every legacy key to its new name (when the new key is still empty)
 * and remove the legacy copy. Idempotent and safe to call often; it only
 * does work on the first call per page load.
 */
export function migrateLegacyStorage(): void {
  if (migrated) return;
  migrated = true;
  try {
    const legacy: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(LEGACY_STORAGE_PREFIX)) legacy.push(k);
    }
    for (const oldKey of legacy) {
      const newKey = STORAGE_PREFIX + oldKey.slice(LEGACY_STORAGE_PREFIX.length);
      const value = localStorage.getItem(oldKey);
      if (value !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, value);
      }
      localStorage.removeItem(oldKey);
    }
  } catch {
    // Private mode or storage disabled: nothing to migrate.
  }
}

export function readItem(name: string): string | null {
  try {
    migrateLegacyStorage();
    return localStorage.getItem(storageKey(name));
  } catch {
    return null;
  }
}

export function writeItem(name: string, value: string): void {
  try {
    localStorage.setItem(storageKey(name), value);
  } catch {
    // best-effort
  }
}

export function removeItem(name: string): void {
  try {
    localStorage.removeItem(storageKey(name));
  } catch {
    // ignore
  }
}
