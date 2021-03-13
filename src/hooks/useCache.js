import { useCallback, useMemo } from 'react';

/**
 * The current eTag implementation in youtube api for search seems to be
 * broken, as it changes on every request regardless the same payload. This
 * hook attempts to minimize the requests to the YT Api, by caching the
 * request's response. Also handles a TTL (in seconds), to refresh the item
 * when it expires.
 */

function useCache({ storageManager = localStorage } = {}) {
  const setItem = useCallback(
    (key, data, customTtl) => {
      const item = {
        timestamp: Date.now(),
        ttl: customTtl || 'Infinity',
        data,
      };

      storageManager.setItem(key, JSON.stringify(item));
    },
    [storageManager]
  );

  const getItem = useCallback(
    (key) => {
      const stringifiedItem = storageManager.getItem(key);

      if (stringifiedItem) {
        const item = JSON.parse(stringifiedItem, (_, value) =>
          value === 'Infinity' ? Infinity : value
        );

        if (Date.now() - item.timestamp <= item.ttl * 1000) {
          return item.data;
        }
      }

      return null;
    },
    [storageManager]
  );

  const cache = useMemo(
    () => ({
      setItem,
      getItem,
    }),
    [setItem, getItem]
  );

  return cache;
}

export { useCache };
