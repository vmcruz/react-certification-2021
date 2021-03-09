import { useEffect, useState, useRef, useCallback } from 'react';
import ytAPI from 'api/ytAPI';
import { useCache } from './useCache';

function useYoutubeSearch({ for: queryType } = {}) {
  if (!['query', 'related'].includes(queryType)) {
    throw new Error('Unsupported Youtube Search type');
  }

  // As the search response won't change so often we set a TTL of 1hr
  const { getItem, setItem } = useCache({ ttl: 3600 });
  const items = useRef([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);

  const youtubeSearch = useCallback(
    async ({ pageToken } = {}) => {
      try {
        const cacheKey = `${queryType}@${searchTerm}${pageToken ? `#${pageToken}` : ''}`;
        // Look for cached results first
        const cachedResults = getItem(cacheKey);

        if (cachedResults) {
          items.current.push(...cachedResults.items);
          setPagination(cachedResults.pagination);
        } else {
          let searchObj = {};

          // eslint-disable-next-line default-case
          switch (queryType) {
            case 'query':
              searchObj = {
                pageToken,
                query: searchTerm,
              };
              break;
            case 'related':
              searchObj = {
                pageToken,
                relatedToVideoId: searchTerm,
              };
              break;
          }

          const data = await ytAPI.search(searchObj);
          const { items: dataItems, nextPageToken, prevPageToken } = data;

          items.current.push(...dataItems);
          const paginationTokens = {
            nextPageToken,
            prevPageToken,
          };

          setPagination(paginationTokens);

          setItem(cacheKey, {
            items: dataItems,
            pagination: paginationTokens,
          });
        }
      } catch (e) {
        console.error(e);
        setError(e);
      }
    },
    [queryType, searchTerm, setItem, getItem]
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

export { useYoutubeSearch };
