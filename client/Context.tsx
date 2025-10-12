'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { Player } from '@/types';

interface AppState {
  token: string | null;
  user: Player | null;
}

type AppAction = {
  type: 'SET_STATE';
  payload: Partial<AppState>;
};

interface AppContextType extends AppState {
  setState: (payload: Partial<AppState>) => void;
}

interface ProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_STATE':
      if (action.payload.token !== undefined)
        localStorage.setItem('authToken', action.payload.token ?? '');
      if (action.payload.user !== undefined)
        localStorage.setItem('user', JSON.stringify(action.payload.user));

      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const Provider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, {
    token: null,
    user: null,
  });

  // set state from localStorage when component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken || storedUser) {
      dispatch({
        type: 'SET_STATE',
        payload: {
          token: storedToken,
          user: storedUser ? JSON.parse(storedUser) : null,
        },
      });
    }
  }, []);

  const setState = (payload: Partial<AppState>) => {
    dispatch({ type: 'SET_STATE', payload });
  };

  return (
    <AppContext.Provider value={{ ...state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useAppContext must be used within a Provider');
  return context;
};