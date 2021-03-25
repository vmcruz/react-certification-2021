const initialState = {
  selectedVideo: null,
  searchQuery: 'wizeline',
  config: {
    theme: 'light',
  },
  theme: null,
  user: null,
};

function setSelectedVideo(state, payload) {
  return { ...state, selectedVideo: payload.videoId };
}

function unsetSelectedVideo(state) {
  return { ...state, selectedVideo: null };
}

function setSearchQuery(state, payload) {
  return { ...state, searchQuery: payload.searchQuery };
}

function setConfig(state, payload) {
  return {
    ...state,
    config: {
      ...state.config,
      ...payload,
    },
  };
}

function setTheme(state, payload) {
  return setConfig(state, { theme: payload.themeKey });
}

function loadConfig(state, payload) {
  return { ...state, config: payload };
}

function restoreSession(state, payload) {
  return { ...state, user: payload };
}

function login(state, payload) {
  return { ...state, user: payload };
}

function logout(state) {
  return { ...state, user: null };
}

const actions = {
  SET_VIDEO: setSelectedVideo,
  UNSET_VIDEO: unsetSelectedVideo,
  SEARCH_QUERY: setSearchQuery,
  SET_THEME: setTheme,
  LOAD_CONFIG: loadConfig,
  LOGIN: login,
  LOGOUT: logout,
  RESTORE_SESSION: restoreSession,
};

function reducer(state, action) {
  if (!(action.type in actions)) {
    throw new Error(`${action.type} is not a valid action for Global.reducer`);
  }

  const actionCallee = actions[action.type];

  return actionCallee(state, action.payload);
}

export { reducer, initialState };
