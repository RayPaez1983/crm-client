import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_MENU_QUERY = gql`
  query getMenu {
    getMenu {
      id
      dishName
      protein
      carbohydrates
      vegetables
      inStock
      price
    }
  }
`;

const MenuData = createContext();

export const useMenuData = () => {
  return useContext(MenuData);
};

const initialState = {
  data: [],
  loading: true,
};

const menuDataReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_MENU_REQUEST':
      return { ...state, data: action.data?.getMenu };
    case 'DATA_MENU_LOADING':
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};

export const MenuDataProvider = ({ children }) => {
  const { data, loading } = useQuery(GET_MENU_QUERY);
  const [menuDataState, dispatch] = useReducer(menuDataReducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'DATA_MENU_REQUEST',
      data,
    });
    dispatch({
      type: 'DATA_MENU_LOADING',
      loading,
    });
  }, [data, loading]);

  return (
    <MenuData.Provider value={{ menuDataState, dispatch }}>
      {children}
    </MenuData.Provider>
  );
};
