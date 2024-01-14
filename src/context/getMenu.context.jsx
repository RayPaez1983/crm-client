import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from '@/context/sign-in.context';

const MenuData = createContext();

export const useMenuData = () => {
  return useContext(MenuData);
};

const initialState = {
  token: '',
};

const tokenReducer = (state, action) => {
  switch (action.type) {
    case 'TOKEN_REQUEST':
      return { ...state, token: action.token };

    default:
      return state;
  }
};

export const TokenProvider = ({ children }) => {
  const { authState } = useAuth();
  const [tokenState, dispatch] = useReducer(tokenReducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch({
        type: 'TOKEN_REQUEST',
        token: window.localStorage.getItem('token'),
      });
    }
  }, [authState.dataLogin.token]);

  console.log(tokenState, 'que putas opasa');
  return (
    <MenuData.Provider value={{ tokenState, dispatch }}>
      {children}
    </MenuData.Provider>
  );
};
