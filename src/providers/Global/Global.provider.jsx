import { useCachedStorage } from 'hooks/useCachedStorage';
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
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
  const cache = useCachedStorage();
  const favKey = `favs@user${state.user?.id}`;
  const [favorites, setFavorites] = useState([]);
  // manages user session for 1 hr, to avoid relogin every time the page refreshes
  const sessionCache = useCachedStorage({ ttl: 3600 });

  useEffect(() => {
    const appConfig = cache.getItem('app@config');
    const appUser = sessionCache.getItem('app@user');

    if (appConfig) {
      dispatch({
        type: 'LOAD_CONFIG',
        payload: appConfig,
      });
    }

    if (appUser) {
      dispatch({
        type: 'RESTORE_SESSION',
        payload: appUser,
      });
    }

    // loads just once
  }, [cache, sessionCache]);

  useEffect(() => {
    // save the state on every change
    const { config, user } = state;
    cache.setItem('app@config', config);
    sessionCache.setItem('app@user', user);

    if (user) {
      // restore favs when user logs in
      setFavorites(cache.getItem(favKey));
    }
  }, [state, cache, sessionCache, favKey]);

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

  function updateFavs(newFavs) {
    setFavorites(newFavs);
    cache.setItem(favKey, newFavs);
  }

  function addFavorite(videoData) {
    const newFavs = [...favorites, videoData];
    updateFavs(newFavs);
  }

  function removeFavorite(videoId) {
    const newFavs = [...favorites.filter((favorite) => favorite.id !== videoId)];
    updateFavs(newFavs);
  }

  function isVideoFaved(videoId) {
    return favorites.some((favorite) => favorite.id === videoId);
  }

  const theme = themes[state.config.theme];

  const favUtils = {
    add: addFavorite,
    remove: removeFavorite,
    isFaved: isVideoFaved,
  };

  const globalState = {
    state,
    toggleTheme,
    theme,
    // only available when the user is logged in
    ...(state.user ? { favUtils, favorites } : null),
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
