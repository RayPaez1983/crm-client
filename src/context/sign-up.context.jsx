import React, { createContext, useContext, useReducer } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const NEW_USER = gql`
  mutation newUser($input: userInput) {
    newUser(input: $input) {
      name
      lastname
      id
      email
      created
    }
  }
`;

const NewUserContext = createContext();

export const newUser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(NewUserContext);
};

const initialState = {
  name: '',
  lastname: '',
  id: '',
  email: '',
  password: '',
  dataSignUp: {},
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_UP_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        dataSignUp: state.dataSignUp,
      };
    case 'SIGN_UP_ERROR':
      return { ...state, isLoading: false, error: state.error };
    default:
      return state;
  }
};

export const NewUserProvider = ({ children }) => {
  const router = useRouter();
  const [newUser] = useMutation(NEW_USER);
  const [newUserState, dispatch] = useReducer(reducer, initialState);

  const handleSignUp = async (name, lastname, email, password) => {
    dispatch({ type: 'SIGN_UP_REQUEST' });
    try {
      // Simulating an API call for login
      const { data } = await newUser({
        variables: {
          input: {
            name,
            lastname,
            email,
            password,
          },
        },
      });
      if (data) {
        router.push({
          pathname: `/sign-in`,
        });
      }
      console.log(data, newUserState, 'new users');
      dispatch({ type: 'SIGN_UP_SUCCESS', dataSignUp: data.newUser });
    } catch (error) {
      dispatch({ type: 'SIGN_UP_ERROR', error: error.message });
      console.log(error);
    }
  };

  return (
    <NewUserContext.Provider value={{ newUserState, dispatch, handleSignUp }}>
      {children}
    </NewUserContext.Provider>
  );
};
