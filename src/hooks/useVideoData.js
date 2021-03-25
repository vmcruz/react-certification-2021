import { useEffect, useState, useCallback } from 'react';
import ytAPI from 'api/ytAPI';
import { useCache } from './useCache';

function useVideoData({ videoId }) {
  // As the video data won't change so often we set a TTL of 1 day
  const cache = useCache({ ttl: 3600 * 24 });
  const [videoData, setVideoData] = useState({});
  const [error, setError] = useState(null);

  const getVideoData = useCallback(async () => {
    try {
      const cacheKey = `video@${videoId}`;
      // Look for cached results first
      const cachedData = cache.getItem(cacheKey);

      if (cachedData) {
        setVideoData(cachedData);
      } else {
        const data = await ytAPI.getVideoData({ videoId });
        const { items } = data || {};

        if (items && items.length) {
          setVideoData(items[0]);
          cache.setItem(cacheKey, items[0]);
        } else {
          // not found or some other issue with the fetch
          setError({
            e: new Error(`Video ${videoId} not found`),
            inApi: false,
          });
        }
      }
    } catch (e) {
      setError({
        e,
        inApi: true,
      });
    }
  }, [cache, videoId]);

  useEffect(() => {
    getVideoData();
  }, [getVideoData]);

  return { videoData, error };
}

export { useVideoData };
