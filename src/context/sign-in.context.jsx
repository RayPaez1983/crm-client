import React, { createContext, useContext, useReducer } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const AUTH_USER = gql`
  mutation authUser($input: authInput) {
    authUser(input: $input) {
      token
    }
  }
`;

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const initialState = {
  username: '',
  password: '',
  dataLogin: {},
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        dataLogin: action.dataLogin,
      };
    case 'LOGIN_ERROR':
      return { ...state, isLoading: false, error: action.error };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [authUser] = useMutation(AUTH_USER);
  const [authState, dispatch] = useReducer(loginReducer, initialState);

  const handleLogin = async (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const { data } = await authUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const token = data.authUser.token;
      localStorage.setItem('token', token);
      if (token) {
        router.push({
          pathname: `/`,
        });
      }
      dispatch({ type: 'LOGIN_SUCCESS', dataLogin: data.authUser });
    } catch (error) {
      if (error.message.includes("This user doesn't have an account")) {
        console.error("User doesn't have an account");
        dispatch({ type: 'LOGIN_ERROR', error: error.message });
      } else {
        dispatch({ type: 'LOGIN_ERROR', error: error.message });
        console.error('An error occurred:', error.message);
      }
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    router.push({
      pathname: `/sign-in`,
    });
  };
  console.log(authState, 'que putas opasa');
  return (
    <AuthContext.Provider
      value={{ authState, dispatch, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
