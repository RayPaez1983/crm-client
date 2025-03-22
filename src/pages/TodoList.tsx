import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useToDoContext } from './../context/toDo.context';

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

interface Task {
  id?: number;
  text: string;
  complete: boolean;
}

const TodoList: React.FC = () => {
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

  const { toDoDataState, deleteToDoOnClick, handleInputChange, createToDo } =
    useToDoContext();

  console.log(toDoDataState);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const taskIdRef = useRef<string>('');

  const updateTask = async () => {
    const updatedTask = {
      id: taskIdRef.current,
      input: {
        text: task,
        complete: false,
      },
    };
    const { data } = await updateTodo({
      variables: updatedTask,
    });
    if (data) {
      setIsEditing(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    setTask('');
  };

  const completeTask = async (index: number, id: string) => {
    taskIdRef.current = id;
    const compleTask = {
      id: tasks[index].id,
      input: {
        text: tasks[index].text,
        complete: true,
      },
    };
    try {
      const { data } = await updateTodo({
        variables: compleTask,
      });
      if (data) {
        console.log(data);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
      setTask('');
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (index: number, id: string) => {
    setTask(tasks[index].text);
    setIsEditing(true);
    taskIdRef.current = id;
  };

  const onCancelClick = () => {
    setIsEditing(false);
    setTask('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Todo List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Type something here"
          value={toDoDataState.task}
          onChange={handleInputChange}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            marginRight: '10px',
          }}
        />
        {isEditing ? (
          <>
            <button
              onClick={updateTask}
              style={{
                padding: '10px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
              Update Task
            </button>
            <button
              onClick={onCancelClick}
              style={{
                padding: '10px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => createToDo(toDoDataState.task)}
            style={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
            Add Task
          </button>
        )}
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {toDoDataState.data.getTodos?.map((task: any, index: number) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              padding: '10px',
              gap: '10px',
              backgroundColor: '#f9f9f9',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}>
            <span
              style={{
                textDecoration: task.complete ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1,
              }}>
              {task.text}
            </span>

            <button
              onClick={() => deleteToDoOnClick(task.id)}
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
              Delete
            </button>
            <button
              onClick={() => editTask(index, task.id)}
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
              Edit
            </button>
            <button
              onClick={() => completeTask(index, task.id)}
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
              Complete task
            </button>
          </li>
        ))}
      </ul>
      <span>{message}</span>
    </div>
  );
};

export default TodoList;
