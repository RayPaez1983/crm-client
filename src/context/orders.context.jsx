import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ORDERS_QUERY = gql`
  query GetOrders {
    getOrders {
      user
      total
      state
      order {
        quantity
        id
      }
      id
      created
      client
    }
  }
`;

const GET_CLIENT = gql`
  query GetClient($getClientId: ID!) {
    getClient(id: $getClientId) {
      phoneNumber
      order
      name
      lastname
      email
      id
    }
  }
`;

const OrderData = createContext();

export const useOrderData = () => {
  return useContext(OrderData);
};

const initialState = {
  data: [],
  loading: true,
};

const orderDataReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'DATA_ORDER_REQUEST':
      return { ...state, data: action.data?.getOrders };
    case 'DATA_ORDER_LOADING':
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};

export const OrderDataProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_ORDERS_QUERY);
  const [orderDataState, dispatch] = useReducer(orderDataReducer, initialState);
  useEffect(() => {
    dispatch({
      type: 'DATA_ORDER_REQUEST',
      data,
    });
    dispatch({
      type: 'DATA_ORDER_LOADING',
      loading,
    });
  }, [data, loading]);

  return (
    <OrderData.Provider value={{ orderDataState, dispatch }}>
      {children}
    </OrderData.Provider>
  );
};
