import { renderHook } from '@testing-library/react-hooks';
import { localStorageMock } from '../../setupTests';

import { useCache } from '../useCache';

const customStorageManager = {
  setItem: jest.fn(),
  getItem: jest.fn(),
};

describe('useCache Hook', () => {
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
    const { result } = renderHook(() => useCache());

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
      useCache({ storageManager: customStorageManager })
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
    const { result } = renderHook(() => useCache({ ttl: 10 }));

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
    const { result } = renderHook(() => useCache({ ttl: 10 }));

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
