'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { User } from '@/types/types';

interface AppState {
  token: string | null;
  user: User | null;
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

// The reducer's only job is to calculate the next state.
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_STATE':
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

  // Effect to rehydrate state from localStorage on initial load
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

  // This effect runs whenever state.token or state.user changes,
  // syncing the new state TO localStorage.
  useEffect(() => {
    if (state.token) {
      localStorage.setItem('authToken', state.token);
    } else {
      localStorage.removeItem('authToken');
    }

    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.token, state.user]);

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
  if (!context) {
    throw new Error('useAppContext must be used within a Provider');
  }
  return context;
};