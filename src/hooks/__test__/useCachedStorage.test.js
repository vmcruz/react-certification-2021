import { renderHook } from '@testing-library/react-hooks';
import { localStorageMock } from '../../setupTests';

import { useCachedStorage } from '../useCachedStorage';

const customStorageManager = {
  setItem: jest.fn(),
  getItem: jest.fn(),
};

describe('useCachedStorage Hook', () => {
  const mockNow = 1616133600000;
  let dateSpy;
  beforeEach(() => {
    customStorageManager.setItem.mockClear();
    customStorageManager.getItem.mockClear();
    dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockNow);
    localStorageMock.mockClear();
  });

  afterEach(() => {
    dateSpy.mockRestore();
  });

  it('it uses default parameters', () => {
    const { result } = renderHook(() => useCachedStorage());

    const dataToBeCached = {
      someKey: 'someValue',
    };

    result.current.setItem('test', dataToBeCached);

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test',
      JSON.stringify({
        timestamp: 1616133600000,
        ttl: 'Infinity',
        data: dataToBeCached,
      })
    );

    result.current.getItem('test');

    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test');
  });

  it('it calls the functions from the given storage manager and default ttl', () => {
    const { result } = renderHook(() =>
      useCachedStorage({ storageManager: customStorageManager })
    );

    const dataToBeCached = {
      someKey: 'someValue',
    };

    result.current.setItem('test', dataToBeCached);

    expect(customStorageManager.setItem).toHaveBeenCalledTimes(1);
    expect(customStorageManager.setItem).toHaveBeenCalledWith(
      'test',
      JSON.stringify({
        timestamp: 1616133600000,
        ttl: 'Infinity',
        data: dataToBeCached,
      })
    );

    result.current.getItem('test');

    expect(customStorageManager.getItem).toHaveBeenCalledTimes(1);
    expect(customStorageManager.getItem).toHaveBeenCalledWith('test');
  });

  it('returns cached data if it is not expired', () => {
    const newMock = mockNow;
    dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => newMock);

    // set the ttl to 10 seconds
    const { result } = renderHook(() => useCachedStorage({ ttl: 10 }));

    const dataToBeCached = {
      someKey: 'someValue',
    };

    result.current.setItem('test', dataToBeCached);

    // advance just 5 seconds
    dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => newMock + 5000);

    const data = result.current.getItem('test');

    expect(data).toEqual({
      someKey: 'someValue',
    });
  });

  it('returns null if data is expired', () => {
    const newMock = mockNow;
    dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => newMock);

    // set the ttl to 10 seconds
    const { result } = renderHook(() => useCachedStorage({ ttl: 10 }));

    const dataToBeCached = {
      someKey: 'someValue',
    };

    result.current.setItem('test', dataToBeCached);

    // advance just 11 seconds
    dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => newMock + 11000);

    const data = result.current.getItem('test');

    expect(data).toEqual(null);

    jest.useRealTimers();
  });
});
