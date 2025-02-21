import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

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

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [updatedTask, setUpdatedTask] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const taskIdRef = useRef<string>('');

  useEffect(() => {
    data ? setTasks(data.getTodos) : null;
  }, [data, tasks]);

  const addTask = async () => {
    const { data } = await newTodo({
      variables: {
        input: {
          text: newTask,
          complete: false,
        },
      },
    });
    if (data) {
      setMessage(`The new todo ${data.newTodo.id} was created sucessfull`);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    setNewTask('');
  };

  const updateTask = async () => {
    const { data } = await updateTodo({
      variables: {
        id: taskIdRef.current,
        input: {
          text: updatedTask,
          complete: false,
        },
      },
    });
    if (data) {
      setIsEditing(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    setNewTask('');
  };

  const deleteTask = async (taskId: number) => {
    try {
      const { data } = await deleteTodo({
        variables: {
          deleteToDoId: taskId,
        },
      });
      if (data) {
        setMessage(`The todo ${data.deleteTodo}`);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const completeTask = async (index: number, id: string) => {
    taskIdRef.current = id;
    console.log(index, tasks[index].id, tasks[index]);
    try {
      const { data } = await updateTodo({
        variables: {
          id: tasks[index].id,
          input: {
            text: tasks[index].text,
            complete: true,
          },
        },
      });
      if (data) {
        console.log(data);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
      setNewTask('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const editTask = (index: number, id: string) => {
    console.log('ID recibido:', id);
    setUpdatedTask(tasks[index].text);
    setIsEditing(true);
    taskIdRef.current = id;
    console.log('taskIdRef.current:', taskIdRef.current);
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
          value={newTask}
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
              onClick={() => setIsEditing(false)}
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
            onClick={addTask}
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
        {tasks.map((task: any, index) => (
          <>
            <li
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '10px',
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
                onClick={() => deleteTask(task.id)}
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
            </li>
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
          </>
        ))}
      </ul>
      <span>{message}</span>
    </div>
  );
};

export default TodoList;
