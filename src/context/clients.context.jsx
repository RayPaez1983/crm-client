import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
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

const GET_CLIENTS_QUERY = gql`
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
const DELETE_CLIENT = gql`
  mutation DeleteClient($deleteClientId: ID!) {
    deleteClient(id: $deleteClientId)
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
      return {
        ...state,
        data: action.data || [],
      };
    case 'DATA_CLIENTS_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'NEW_CLIENTS':
      return {
        ...state,
        newClients: action.data || {},
      };
    default:
      return state;
  }
};

export const ClientsDataProvider = ({ children }) => {
  const router = useRouter();

  const [newClient] = useMutation(NEW_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS_QUERY }],
  });
  const { data, loading } = useQuery(GET_CLIENTS_QUERY);

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS_QUERY }],
  });
  const [clientsDataState, dispatch] = useReducer(
    clientsDataReducer,
    initialState
  );

  const createNewClient = async (name, lastname, email, phoneNumber, order) => {
    try {
      const { data } = await newClient({
        variables: {
          input: { name, lastname, email, phoneNumber, order },
        },
      });
      if (data) {
        router.push({ pathname: `/clients` });
      }
    } catch (error) {
      console.error('Error creating new client:', error);
    }
  };

  const deleteClientOnClick = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await deleteClient({
            variables: {
              deleteClientId: id,
            },
          });
          Swal.fire('Deleted!', data, 'success');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    dispatch({
      type: 'DATA_CLIENTS_REQUEST',
      data: data?.getClients || [],
    });
    dispatch({
      type: 'DATA_CLIENTS_LOADING',
      loading,
    });
  }, [data, loading]);

  return (
    <ClientsData.Provider
      value={{
        clientsDataState,
        dispatch,
        createNewClient,
        deleteClientOnClick,
      }}>
      {children}
    </ClientsData.Provider>
  );
};
