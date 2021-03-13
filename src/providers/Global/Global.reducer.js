const initialState = {
  selectedVideo: null,
  searchQuery: 'wizeline',
};

function setSelectedVideo(state, payload) {
  return { ...state, selectedVideo: payload.video };
}

function unsetSelectedVideo(state) {
  return { ...state, selectedVideo: null };
}

function setSearchQuery(state, payload) {
  return { ...state, searchQuery: payload.searchQuery };
}

const actions = {
  SET_VIDEO: setSelectedVideo,
  UNSET_VIDEO: unsetSelectedVideo,
  SEARCH_QUERY: setSearchQuery,
};

function reducer(state, action) {
  if (!(action.type in actions)) {
    throw new Error(`${action.type} is not a valid action for Global.reducer`);
  }

  const actionCallee = actions[action.type];

  return actionCallee(state, action.payload);
}

export { reducer, initialState };
