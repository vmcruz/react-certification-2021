import { useEffect, useState, useRef, useCallback } from 'react';
import ytAPI from 'api/ytAPI';
import { useCachedStorage } from './useCachedStorage';

function useYoutubeSearch({ using: ytSearchFunction, cachePrefix }) {
  // As the search response won't change so often we set a TTL of 1hr
  const cache = useCachedStorage({ ttl: 3600 });
  const items = useRef([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);

  const youtubeSearch = useCallback(
    async ({ pageToken } = {}) => {
      try {
        const cacheKey = `${cachePrefix}@${searchTerm}${
          pageToken ? `#${pageToken}` : ''
        }`;
        // Look for cached results first
        const cachedResults = cache.getItem(cacheKey);

        if (cachedResults) {
          items.current.push(...cachedResults.items);
          setPagination(cachedResults.pagination);
        } else {
          const data = await ytSearchFunction({
            pageToken,
            searchTerm,
          });
          const { items: dataItems, nextPageToken, prevPageToken } = data;

          items.current.push(...dataItems);
          const paginationTokens = {
            nextPageToken,
            prevPageToken,
          };

          setPagination(paginationTokens);

          cache.setItem(cacheKey, {
            items: dataItems,
            pagination: paginationTokens,
          });
        }
      } catch (e) {
        setError(e);
      }
    },
    [cachePrefix, ytSearchFunction, searchTerm, cache, setError]
  );

  const getQueryPage = useCallback((pageToken) => youtubeSearch({ pageToken }), [
    youtubeSearch,
  ]);

  const nextPage = useCallback(() => {
    if (pagination.nextPageToken) {
      return getQueryPage(pagination.nextPageToken);
    }
  }, [getQueryPage, pagination.nextPageToken]);

  const prevPage = useCallback(() => {
    if (pagination.prevPageToken) {
      return getQueryPage(pagination.prevPageToken);
    }
  }, [getQueryPage, pagination.prevPageToken]);

  useEffect(() => {
    if (searchTerm) {
      items.current = [];
      youtubeSearch();
    }
  }, [searchTerm, youtubeSearch]);

  return { search: setSearchTerm, items: items.current, nextPage, prevPage, error };
}

const useYoutubeQuery = () =>
  useYoutubeSearch({ cachePrefix: 'query', using: ytAPI.searchQuery });

const useYoutubeRelated = () =>
  useYoutubeSearch({ cachePrefix: 'related', using: ytAPI.searchRelated });

export { useYoutubeQuery, useYoutubeRelated };
