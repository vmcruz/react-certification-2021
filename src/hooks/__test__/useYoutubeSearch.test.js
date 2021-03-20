import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import ytAPI from 'api/ytAPI';
import * as cacheHook from 'hooks/useCache';

import { useYoutubeQuery, useYoutubeRelated } from '../useYoutubeSearch';
import ytResults from './__mocks__/ytSearchResult';

const hooksTestHelper = [
  {
    useYoutubeHook: useYoutubeQuery,
    description: 'useYoutubeQuery',
    cachePrefix: 'query',
    apiFn: 'searchQuery',
  },
  {
    useYoutubeHook: useYoutubeRelated,
    description: 'useYoutubeRelated',
    cachePrefix: 'related',
    apiFn: 'searchRelated',
  },
];

hooksTestHelper.forEach((hookHelper) => {
  describe(`${hookHelper.description} Hook`, () => {
    const setupMocks = () => {
      const useCacheSpy = jest.spyOn(cacheHook, 'useCache');
      const apiQuerySpy = jest.spyOn(ytAPI, hookHelper.apiFn);

      const restoreAll = () => {
        useCacheSpy.mockRestore();
        apiQuerySpy.mockRestore();
      };

      return { useCacheSpy, apiQuerySpy, restoreAll };
    };

    it('searches using searchQuery from ytAPI if item has not been cached before or if it is expired', async () => {
      const { useCacheSpy, apiQuerySpy, restoreAll } = setupMocks();
      const cacheMock = {
        setItem: jest.fn(),
        getItem: jest.fn().mockReturnValue(null),
      };

      useCacheSpy.mockImplementation(() => cacheMock);
      apiQuerySpy.mockImplementation(() => Promise.resolve(ytResults));

      const { result } = renderHook(() => hookHelper.useYoutubeHook());

      expect(Array.isArray(result.current.items)).toBeTruthy();
      expect(result.current.items).toHaveLength(0);

      await act(async () => {
        await result.current.search('test');
      });

      const expectedCachekKey = `${hookHelper.cachePrefix}@test`;

      expect(cacheMock.getItem).toHaveBeenCalledTimes(1);
      expect(cacheMock.getItem).toHaveBeenCalledWith(expectedCachekKey);

      expect(apiQuerySpy).toHaveBeenCalledTimes(1);
      expect(apiQuerySpy).toHaveBeenCalledWith({
        pageToken: undefined,
        searchTerm: 'test',
      });

      expect(cacheMock.setItem).toHaveBeenCalledTimes(1);
      expect(cacheMock.setItem).toHaveBeenCalledWith(expectedCachekKey, {
        items: ytResults.items,
        pagination: {
          nextPageToken: ytResults.nextPageToken,
          prevPageToken: undefined,
        },
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items).toEqual(ytResults.items);

      restoreAll();
    });

    it('gets the results from the cache', async () => {
      const { useCacheSpy, apiQuerySpy, restoreAll } = setupMocks();

      const cacheMock = {
        setItem: jest.fn(),
        getItem: jest.fn().mockReturnValue({
          items: ytResults.items,
          pagination: {
            nextPageToken: 'ABC',
            prevPageToken: 'DEF',
          },
        }),
      };

      useCacheSpy.mockImplementation(() => cacheMock);

      const { result } = renderHook(() => hookHelper.useYoutubeHook());

      expect(result.current.items).toHaveLength(0);

      await act(async () => {
        await result.current.search('test');
      });

      const expectedCachekKey = `${hookHelper.cachePrefix}@test`;
      expect(cacheMock.getItem).toHaveBeenCalledTimes(1);
      expect(cacheMock.getItem).toHaveBeenCalledWith(expectedCachekKey);

      expect(apiQuerySpy).toHaveBeenCalledTimes(0);
      expect(cacheMock.setItem).toHaveBeenCalledTimes(0);

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items).toEqual(ytResults.items);

      restoreAll();
    });

    it('sets an error if there was a problem searching for results', async () => {
      const { apiQuerySpy, restoreAll } = setupMocks();

      apiQuerySpy.mockImplementation(() => Promise.reject(new Error('Test error')));

      const { result } = renderHook(() => hookHelper.useYoutubeHook());

      expect(result.current.error).toEqual(null);

      await act(async () => {
        await result.current.search('test');
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.error.message).toEqual('Test error');

      restoreAll();
    });

    const requestPageTestHelper = [
      {
        pageToken: 'NEXT_PAGE',
        description: 'next',
        fn: 'nextPage',
      },
      {
        pageToken: 'PREV_PAGE',
        description: 'prev',
        fn: 'prevPage',
      },
    ];

    requestPageTestHelper.forEach((pageHelper) => {
      it(`requests ${pageHelper.description} page if exists`, async () => {
        const { useCacheSpy, apiQuerySpy, restoreAll } = setupMocks();

        const cacheMock = {
          setItem: jest.fn(),
          getItem: jest.fn().mockReturnValue({
            items: ytResults.items,
            pagination: {
              nextPageToken: 'NEXT_PAGE',
              prevPageToken: 'PREV_PAGE',
            },
          }),
        };

        useCacheSpy.mockImplementation(() => cacheMock);
        apiQuerySpy.mockImplementation(() => Promise.resolve(ytResults));

        const { result } = renderHook(() => hookHelper.useYoutubeHook());

        expect(result.current.items).toHaveLength(0);

        await act(async () => {
          await result.current.search('test');
        });

        cacheMock.setItem = jest.fn();
        cacheMock.getItem = jest.fn();

        await act(async () => {
          await result.current[pageHelper.fn]();
        });

        const expectedCachekKey = `${hookHelper.cachePrefix}@test#${pageHelper.pageToken}`;

        expect(cacheMock.getItem).toHaveBeenCalledTimes(1);
        expect(cacheMock.getItem).toHaveBeenCalledWith(expectedCachekKey);

        expect(apiQuerySpy).toHaveBeenCalledTimes(1);
        expect(apiQuerySpy).toHaveBeenCalledWith({
          pageToken: pageHelper.pageToken,
          searchTerm: 'test',
        });

        expect(cacheMock.setItem).toHaveBeenCalledTimes(1);
        expect(cacheMock.setItem).toHaveBeenCalledWith(expectedCachekKey, {
          items: ytResults.items,
          pagination: {
            nextPageToken: ytResults.nextPageToken,
            prevPageToken: undefined,
          },
        });

        expect(result.current.items).toHaveLength(2);
        expect(result.current.items).toEqual([...ytResults.items, ...ytResults.items]);

        restoreAll();
      });
    });
  });
});
