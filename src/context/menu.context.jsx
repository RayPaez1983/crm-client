import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

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

const NEW_DISH = gql`
  mutation newDish($input: dishInput) {
    newDish(input: $input) {
      vegetables
      protein
      price
      inStock
      id
      dishName
      created
      carbohydrates
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
  dishNew: {},
};

const menuDataReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_MENU_REQUEST':
      return { ...state, data: action.data?.getMenu };
    case 'DATA_MENU_LOADING':
      return { ...state, loading: action.loading };
    case 'NEW_MENU_PLATE':
      return { ...state, dishNew: action.data };
    default:
      return state;
  }
};

export const MenuDataProvider = ({ children }) => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_MENU_QUERY);
  const [newDish] = useMutation(NEW_DISH, {
    refetchQueries: [{ query: GET_MENU_QUERY }],
  });
  const [menuDataState, dispatch] = useReducer(menuDataReducer, initialState);

  const createNewPlate = async (
    vegetables,
    protein,
    price,
    inStock,
    dishName,
    carbohydrates
  ) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const { data } = await newDish({
        variables: {
          input: {
            protein,
            price,
            inStock,
            dishName,
            carbohydrates,
            vegetables,
          },
        },
      });
      console.log(data, 'new plate');
      if (data) {
        router.push({
          pathname: `/`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <MenuData.Provider value={{ menuDataState, dispatch, createNewPlate }}>
      {children}
    </MenuData.Provider>
  );
};
