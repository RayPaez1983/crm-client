import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';


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
  taskId: '',
  isEditing: false,
  loading: true,
  error: {},
  newToDo: {},
};

const toDoDataReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'TO_DO_REQUEST':
      return {
        ...state,
        data: action.payload || [],
      };
    case 'TO_DO_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'TO_DO_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'NEW_TODO':
      return {
        ...state,
        newToDo: action.payload || {},
      };
    case 'SET_TASK_TEXT':
      return {
        ...state,
        task: action.payload,
      };
    case 'IS_EDITING_TEXT':
      return {
        ...state,
        isEditing: action.payload,
      };
    case 'SET_TASK_ID':
      return {
        ...state,
        taskId: action.payload,
      };
    default:
      return state;
  }
};

export const ToDoProvider = ({ children }) => {
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
    console.log(loading, error);
    dispatch({
      type: 'TO_DO_REQUEST',
      payload: data,
    });
    dispatch({
      type: 'TO_DO_LOADING',
      payload: loading,
    });
    dispatch({
      type: 'TO_DO_ERROR',
      payload: error,
    });
  }, [data, error, loading]);

  const handleInputChange = (event) => {
    dispatch({
      type: 'SET_TASK_TEXT',
      payload: event.target.value,
    });
  };

  const editTask = (index, id) => {
    dispatch({
      type: 'SET_TASK_TEXT',
      payload: toDoDataState.data.getTodos?.[index].text,
    });
    dispatch({
      type: 'IS_EDITING_TEXT',
      payload: true,
    });
    dispatch({
      type: 'SET_TASK_ID',
      payload: id,
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
        type: 'SET_TASK_TEXT',
        payload: '',
      });
    }
  };
  const updateTask = async (text, taskId) => {
    const updatedTask = {
      id: taskId,
      input: {
        text,
        complete: false,
      },
    };
    const { data } = await updateTodo({
      variables: updatedTask,
    });
    if (data) {
      Swal.fire(
        'To Do Updated Successfully!',
        `the task ${data.updateTodo.text}`,
        'success'
      );
      dispatch({
        type: 'SET_TASK_TEXT',
        payload: '',
      });
      dispatch({
        type: 'IS_EDITING_TEXT',
        payload: false,
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

  const completeTask = async (index, taskId) => {
    const compleTask = {
      id: taskId,
      input: {
        text: toDoDataState.data.getTodos?.[index].text,
        complete: true,
      },
    };
    try {
      const { data } = await updateTodo({
        variables: compleTask,
      });
      if (data) {
        Swal.fire('This task is Completed', data.updateTodo.text, 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelClick = () => {
    dispatch({
      type: 'SET_TASK_TEXT',
      payload: '',
    });
    dispatch({
      type: 'IS_EDITING_TEXT',
      payload: false,
    });
  };

  return (
    <ToDoContext.Provider
      value={{
        toDoDataState,
        createToDo,
        deleteToDoOnClick,
        handleInputChange,
        editTask,
        updateTask,
        completeTask,
        onCancelClick,
      }}>
      {children}
    </ToDoContext.Provider>
  );
};
