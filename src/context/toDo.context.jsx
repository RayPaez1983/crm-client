import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const GET_ORDERS_QUERY = gql`
  query getTodo {
    getTodos {
      id
      text
      complete
    }
  }
`;

const ADD_NEW_TODO_MUTATION = gql`
  mutation newTodo($input: TodoInput) {
    newTodo(input: $input) {
      id
      text
      complete
    }
  }
`;
const UPDATE_TODO_MUTATION = gql`
  mutation updateTodo($id: ID!, $input: TodoInput) {
    updateTodo(id: $id, input: $input) {
      id
      text
      complete
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($deleteToDoId: ID!) {
    deleteTodo(id: $deleteToDoId)
  }
`;

const ToDoContext = createContext();

export const useToDoContext = () => {
  return useContext(ToDoContext);
};

const initialState = {
  data: [],
  task: '',
  message: '',
  isEditing: false,
  loading: true,
  newToDo: {},
};

const toDoDataReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'TO_DO_REQUEST':
      return {
        ...state,
        data: action.data || [],
      };
    case 'TO_DO_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'NEW_TODO':
      return {
        ...state,
        newToDo: action.data || {},
      };
    case 'NEW_TASK':
      return {
        ...state,
        task: action.payload,
      };
    default:
      return state;
  }
};

export const ToDoProvider = ({ children }) => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_ORDERS_QUERY);
  const [newTodo] = useMutation(ADD_NEW_TODO_MUTATION, {
    refetchQueries: [{ query: GET_ORDERS_QUERY }],
  });

  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION, {
    refetchQueries: [{ query: GET_ORDERS_QUERY }],
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_ORDERS_QUERY }],
  });

  const [toDoDataState, dispatch] = useReducer(toDoDataReducer, initialState);

  useEffect(() => {
    console.log(data);
    dispatch({
      type: 'TO_DO_REQUEST',
      data,
    });
    dispatch({
      type: 'TO_DO_LOADING',
      loading,
    });
  }, [data, loading]);

  const handleInputChange = (event) => {
    dispatch({
      type: 'NEW_TASK',
      payload: event.target.value,
    });
  };

  const createToDo = async (text) => {
    const newTask = {
      text,
      complete: false,
    };

    const { data } = await newTodo({
      variables: {
        input: newTask,
      },
    });
    if (data) {
      Swal.fire('To Do Created!', data, 'success');
      dispatch({
        type: 'NEW_TASK',
        payload: '',
      });
    }
  };
  const deleteToDoOnClick = async (taskId) => {
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
          const { data } = await deleteTodo({
            variables: {
              deleteToDoId: taskId,
            },
          });
          if (data) {
            Swal.fire('Deleted!', data, 'success');
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <ToDoContext.Provider
      value={{
        toDoDataState,
        createToDo,
        deleteToDoOnClick,
        handleInputChange,
      }}>
      {children}
    </ToDoContext.Provider>
  );
};
