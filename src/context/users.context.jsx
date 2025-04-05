import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      name
      lastname
      id
      email
      created
    }
  }
`;
const DELETE_USER = gql`
  mutation Mutation($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;

const UsersContext = createContext();

export const useUsersContext = () => {
  return useContext(UsersContext);
};

const initialState = {
  data: [],
  loading: true,
  newUsers: {},
};

const clientsDataReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'DATA_USERS_REQUEST':
      return {
        ...state,
        data: action.payload || [],
      };
    case 'DATA_USERS_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export const UsersDataProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const [usersState, dispatch] = useReducer(clientsDataReducer, initialState);
  console.log(error);
  const deleteUserOnClick = async (id) => {
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
          await deleteUser({
            variables: {
              deleteUserId: id,
            },
          });
        } catch (error) {
          console.log(error);
        }
        Swal.fire('Deleted!', data.deleteUser, 'success');
      }
    });
  };

  useEffect(() => {
    dispatch({
      type: 'DATA_USERS_REQUEST',
      payload: data,
    });
    dispatch({
      type: 'DATA_USERS_LOADING',
      payload: loading,
    });
  }, [data, loading]);

  return (
    <UsersContext.Provider
      value={{
        usersState,
        deleteUserOnClick,
      }}>
      {children}
    </UsersContext.Provider>
  );
};
