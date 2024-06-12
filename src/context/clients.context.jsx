import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const NEW_CLIENT = gql`
  mutation Mutation($input: clientInput) {
    newClient(input: $input) {
      order
      phoneNumber
      name
      lastname
      email
    }
  }
`;

const GET_CLIENTS = gql`
  query GetClients {
    getClients {
      phoneNumber
      order
      name
      lastname
      id
      email
      created
    }
  }
`;

const ClientsData = createContext();

export const useClientsData = () => {
  return useContext(ClientsData);
};

const initialState = {
  data: [],
  loading: true,
  newClients: {},
};

const clientsDataReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_CLIENTS_REQUEST':
      return { ...state, data: action.data?.getClients };
    case 'DATA_CLIENTS_LOADING':
      return { ...state, loading: action.loading };
    case 'NEW_CLIENTS':
      return { ...state, newClients: action.data };
    default:
      return state;
  }
};

export const ClientsDataProvider = ({ children }) => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_CLIENTS);
  const [newClient] = useMutation(NEW_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });
  const [clientsDataState, dispatch] = useReducer(
    clientsDataReducer,
    initialState
  );

  const createNewClient = async (name, lastname, email, phoneNumber, order) => {
    dispatch({ type: 'NEW_CLIENTS' });
    try {
      const { data } = await newClient({
        variables: {
          input: {
            name,
            lastname,
            email,
            phoneNumber,
            order,
          },
        },
      });
      if (data) {
        router.push({
          pathname: `/clients`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch({
      type: 'DATA_CLIENTS_REQUEST',
      data,
    });
    dispatch({
      type: 'DATA_CLIENTS_LOADING',
      loading,
    });
  }, [data, loading]);

  return (
    <ClientsData.Provider
      value={{ clientsDataState, dispatch, createNewClient }}>
      {children}
    </ClientsData.Provider>
  );
};
