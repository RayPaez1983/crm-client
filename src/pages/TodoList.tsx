import React from 'react';
import { useToDoContext } from './../context/toDo.context';

const TodoList: React.FC = () => {
  const {
    toDoDataState,
    deleteToDoOnClick,
    handleInputChange,
    createToDo,
    editTask,
    updateTask,
    completeTask,
    onCancelClick,
  } = useToDoContext();

  if (toDoDataState.loading) return <p>Loading...</p>;
  if (toDoDataState.error) return <p>Error: {toDoDataState.error.message}</p>;

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
        {toDoDataState.isEditing ? (
          <>
            <button
              onClick={() =>
                updateTask(toDoDataState.task, toDoDataState.taskId)
              }
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
    </div>
  );
};

export default TodoList;
