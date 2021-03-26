import { useCache } from 'hooks/useCache';
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import { ThemeProvider } from 'styled-components';

import themes from 'themes';
import { reducer, initialState } from './Global.reducer';

const GlobalStateContext = createContext(null);
const GlobalDispatchContext = createContext(null);

function useGlobalDispatch() {
  const context = useContext(GlobalDispatchContext);
  if (!context) {
    throw new Error('Cannot use context without a GlobalProvider');
  }

  return context;
}

function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('Cannot use context without a GlobalProvider');
  }

  return context;
}

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cache = useCache();

  useEffect(() => {
    const appState = cache.getItem('app@state');

    if (appState) {
      const { searchQuery, config } = appState;
      dispatch({
        type: 'SEARCH_QUERY',
        payload: { searchQuery },
      });

      dispatch({
        type: 'LOAD_CONFIG',
        payload: { config },
      });
    }

    // loads just once
  }, [cache]);

  useEffect(() => {
    // save the state on every change
    const { searchQuery, config } = state;
    cache.setItem('app@state', {
      searchQuery,
      config,
    });
  }, [state, cache]);

  const toggleTheme = useCallback(() => {
    if (state.config.theme === 'dark') {
      const themeKey = 'light';
      dispatch({
        type: 'SET_THEME',
        payload: { themeKey },
      });
    } else {
      const themeKey = 'dark';
      dispatch({
        type: 'SET_THEME',
        payload: { themeKey },
      });
    }
  }, [state.config.theme]);

  const theme = themes[state.config.theme];

  const globalState = {
    state,
    toggleTheme,
    theme,
  };

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={globalState}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
}

export { useGlobalDispatch, useGlobalState };

export default GlobalProvider;
