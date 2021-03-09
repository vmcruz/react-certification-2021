import { useCallback } from 'react';

/**
 * The current eTag implementation in youtube api for search seems to be
 * broken, as it changes on every request regardless the same payload. This
 * hook attempts to minimize the requests to the YT Api, by caching the
 * request's response. Also handles a TTL (in seconds), to refresh the item
 * when it expires.
 */

function useCache({ storageManager = localStorage, ttl = 3600 } = {}) {
  const setItem = useCallback(
    (key, data, customTtl) => {
      const item = {
        timestamp: Date.now(),
        ttl: customTtl || ttl,
        data,
      };

      storageManager.setItem(key, JSON.stringify(item));
    },
    [storageManager, ttl]
  );

  const getItem = useCallback(
    (key) => {
      const stringifiedItem = storageManager.getItem(key);

      if (stringifiedItem) {
        const item = JSON.parse(stringifiedItem);

        if (Date.now() - item.timestamp <= item.ttl * 1000) {
          return item.data;
        }
      }

      return null;
    },
    [storageManager]
  );

  return { setItem, getItem };
}

export { useCache };
