import { useReducer } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { reducer, initialState } from '../Global.reducer';

describe('Global reducer', () => {
  let emptyState;

  beforeEach(() => {
    // deep clone of the initialState
    emptyState = JSON.parse(JSON.stringify(initialState));
  });

  it('throws error on invalid actions', () => {
    const { result } = renderHook(() => useReducer(reducer, emptyState));
    const [state, dispatch] = result.current;

    expect(state).toEqual({
      selectedVideo: null,
      searchQuery: 'wizeline',
      config: {
        theme: 'light',
      },
      theme: null,
    });

    act(() => {
      dispatch({ type: 'INVALID' });
    });

    expect(result.error).toEqual(
      new Error('INVALID is not a valid action for Global.reducer')
    );
  });

  it('verifies the data is set correctly', () => {
    const STATE = 0;
    const { result } = renderHook(() => useReducer(reducer, emptyState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'SET_VIDEO', payload: { videoId: 'video_payload' } });
    });

    expect(result.current[STATE].selectedVideo).toEqual('video_payload');

    act(() => {
      dispatch({ type: 'UNSET_VIDEO' });
    });

    expect(result.current[STATE].selectedVideo).toEqual(null);

    act(() => {
      dispatch({ type: 'SEARCH_QUERY', payload: { searchQuery: 'wizeline' } });
    });

    expect(result.current[STATE].searchQuery).toEqual('wizeline');

    act(() => {
      dispatch({ type: 'SET_THEME', payload: { themeKey: 'dark' } });
    });

    expect(result.current[STATE].config.theme).toEqual('dark');

    act(() => {
      dispatch({ type: 'LOAD_CONFIG', payload: { config: { overrides: 'config' } } });
    });

    expect(result.current[STATE].config).toEqual({
      overrides: 'config',
    });
  });
});
