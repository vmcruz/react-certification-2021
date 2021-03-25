const initialState = {
  selectedVideo: null,
  searchQuery: 'wizeline',
  config: {
    theme: 'light',
  },
  theme: null,
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
  return { ...state, config: payload.config };
}

const actions = {
  SET_VIDEO: setSelectedVideo,
  UNSET_VIDEO: unsetSelectedVideo,
  SEARCH_QUERY: setSearchQuery,
  SET_THEME: setTheme,
  LOAD_CONFIG: loadConfig,
};

function reducer(state, action) {
  if (!(action.type in actions)) {
    throw new Error(`${action.type} is not a valid action for Global.reducer`);
  }

  const actionCallee = actions[action.type];

  return actionCallee(state, action.payload);
}

export { reducer, initialState };
