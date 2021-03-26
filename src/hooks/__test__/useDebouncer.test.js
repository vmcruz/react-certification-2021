import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';

import { useDebouncer } from '../useDebouncer';

describe('useDebouncer Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('it debounces with default parameters', () => {
    // default sets the debouncer to 700ms
    const { result } = renderHook(() => useDebouncer());
    const customFn = jest.fn();

    act(() => {
      result.current(() => customFn());
      result.current(() => customFn());
      result.current(() => customFn());

      jest.advanceTimersByTime(200);

      result.current(() => customFn());
      result.current(() => customFn());
      result.current(() => customFn());

      jest.advanceTimersByTime(200);

      result.current(() => customFn());
      result.current(() => customFn());
      result.current(() => customFn());

      jest.advanceTimersByTime(700);
    });
    expect(customFn).toHaveBeenCalledTimes(1);
  });

  it('it debounces with custom timeout', () => {
    const { result } = renderHook(() => useDebouncer({ timeout: 200 }));
    const customFn = jest.fn();

    act(() => {
      result.current(() => customFn());
      result.current(() => customFn());
      result.current(() => customFn());

      jest.advanceTimersByTime(200);

      result.current(() => customFn());
      result.current(() => customFn());
      result.current(() => customFn());

      jest.advanceTimersByTime(200);
    });

    expect(customFn).toHaveBeenCalledTimes(2);
  });
});
