import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

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

const DELETE_ORDER = gql`
  mutation DeleteOrder($deleteOrderId: ID!) {
    deleteOrder(id: $deleteOrderId)
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
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    refetchQueries: [{ query: GET_ORDERS_QUERY }],
  });
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

  const deleteSingleOrder = async (id) => {
    await deleteOrder({ variables: { deleteOrderId: id } });
  };

  return (
    <OrderData.Provider value={{ orderDataState, dispatch, deleteSingleOrder }}>
      {children}
    </OrderData.Provider>
  );
};
