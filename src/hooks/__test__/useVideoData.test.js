import { renderHook } from '@testing-library/react-hooks';

import * as cachedStorageHook from 'hooks/useCachedStorage';
import ytAPI from 'api/ytAPI';
import { useVideoData } from '../useVideoData';
import videoResult from './__mocks__/videoResultPage';

describe('useVideoData Hook', () => {
  let useCachedStorageSpy;
  let ytAPISpy;

  beforeEach(() => {
    useCachedStorageSpy = jest.spyOn(cachedStorageHook, 'useCachedStorage');
    ytAPISpy = jest.spyOn(ytAPI, 'getVideoData');
  });

  it('does not fetch the videoId if it is not defined', () => {
    const { result } = renderHook(() => useVideoData({ videoId: null }));

    expect(result.current.videoData).toEqual({});
  });

  it('fetches from the cached storage if set', () => {
    const cacheMock = {
      getItem: jest.fn().mockReturnValue(videoResult.items[0]),
    };

    useCachedStorageSpy.mockImplementation(() => cacheMock);

    const { result } = renderHook(() => useVideoData({ videoId: 'test' }));

    expect(cacheMock.getItem).toHaveBeenCalledTimes(1);
    expect(cacheMock.getItem).toHaveBeenCalledWith('video@test');
    expect(result.current.videoData).toEqual(videoResult.items[0]);
  });

  it('fetches from the API if not set in cachedStorage', async () => {
    const cacheMock = {
      setItem: jest.fn(),
      getItem: jest.fn().mockReturnValue(null),
    };

    useCachedStorageSpy.mockImplementation(() => cacheMock);
    ytAPISpy.mockResolvedValue(videoResult);

    const { result, waitForNextUpdate } = renderHook(() =>
      useVideoData({ videoId: 'test' })
    );

    await waitForNextUpdate();

    expect(result.current.videoData).toEqual(videoResult.items[0]);
    expect(cacheMock.setItem).toHaveBeenCalledTimes(1);
    expect(cacheMock.setItem).toHaveBeenCalledWith('video@test', videoResult.items[0]);
  });

  it('returns video not found error when fetching from api', async () => {
    const cacheMock = {
      setItem: jest.fn(),
      getItem: jest.fn().mockReturnValue(null),
    };

    useCachedStorageSpy.mockImplementation(() => cacheMock);
    ytAPISpy.mockResolvedValue({ ...videoResult, items: [] });

    const { result, waitForNextUpdate } = renderHook(() =>
      useVideoData({ videoId: 'test' })
    );

    await waitForNextUpdate();

    expect(result.current.videoData).toEqual({});
    expect(result.current.error).toEqual({
      e: new Error('Video test not found'),
      inApi: false,
    });
  });
});
