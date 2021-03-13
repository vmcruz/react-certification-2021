import React, { createContext, useContext, useReducer } from 'react';
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

  const globalState = {
    state,
  };

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={globalState}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
}

export { useGlobalDispatch, useGlobalState };

export default GlobalProvider;
