import { createContext, useReducer, useContext, } from "react";
import axios from 'axios';

// Types
import Auth from '../types/Auth';
import { default as AuthContextState } from '../types/AuthContext';

type Props = {
  children: JSX.Element
}

type Action =
  | { type: 'SET_AUTH', payload: Auth }
  | { type: 'SET_AUTH_IS_LOADING', payload: boolean }
  | { type: 'REMOVE_AUTH' }


// Initial states
const initState: AuthContextState = {
  user: {
    id: 0,
    name: '',
    email: '',
  },
  token: {
    token: '',
    type: '',
  },
  setAuth: () => { },
  setAuthIsLoading: () => { },
  removeAuth: () => { },
  isLoading: false,
};


// Actions
const setAuth = (data: Auth, state: AuthContextState) => {
  localStorage.setItem('auth', JSON.stringify(data))
  axios.defaults.headers.common['Authorization'] = `${data.token.type} ${data.token.token}`;

  return {
    ...state,
    ...data,
  };
};

const setAuthIsLoading = (data: boolean, state: AuthContextState) => {
  return {
    ...state,
    isLoading: data,
  };
};

const removeAuth = (state: AuthContextState) => {
  localStorage.removeItem('auth');
  delete axios.defaults.headers.common["Authorization"];

  return {
    ...state,
    ...initState,
  };
};

// Reducer
const AuthReducer = (state: AuthContextState, action: Action) => {
  switch (action.type) {
    case "SET_AUTH":
      return setAuth(action.payload, state);
    case "SET_AUTH_IS_LOADING":
      return setAuthIsLoading(action.payload, state);
    case "REMOVE_AUTH":
      return removeAuth(state);
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextState | undefined>(undefined);

// Provider
const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  const setAuth = (data: Auth) => dispatch({
    type: 'SET_AUTH',
    payload: data,
  });
  const setAuthIsLoading = (data: boolean) => dispatch({
    type: 'SET_AUTH_IS_LOADING',
    payload: data,
  });
  const removeAuth = () => dispatch({
    type: 'REMOVE_AUTH',
  });

  return (
    <AuthContext.Provider value={{ ...state, setAuth, setAuthIsLoading, removeAuth, }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const authContext = useContext(AuthContext)

  if (authContext === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }

  return authContext
}

export {
  AuthContextProvider,
  useAuthContext,
};