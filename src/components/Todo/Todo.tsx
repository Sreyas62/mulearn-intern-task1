import React, { useState, useEffect } from 'react';
import './Todo.css'; // Import CSS file for Todo component styling

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoProps {
  handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Todo = ({ handleLogout }: TodoProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleTodoStatus = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const updateTodo = () => {
    if (newTodo.trim() === '') return;
    const updatedTodos = todos.map((todo) =>
      todo.id === selectedTodo!.id ? { ...todo, text: newTodo } : todo
    );
    setTodos(updatedTodos);
    setSelectedTodo(null);
    setNewTodo('');
  };

  const cancelUpdate = () => {
    setSelectedTodo(null);
    setNewTodo('');
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <div className="todo-input-container">
        {selectedTodo ? (
          <>
            <input
              type="text"
              placeholder="Update Todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="todo-input"
            />
            <button onClick={updateTodo} className="action-button">
              Update
            </button>
            <button onClick={cancelUpdate} className="action-button">
              Cancel
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="New Todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="todo-input"
            />
            <button onClick={addTodo} className="action-button">
              Add Todo
            </button>
          </>
        )}
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <span
              onClick={() => toggleTodoStatus(todo.id)}
              className="todo-text"
            >
              {todo.text}
            </span>
            {!selectedTodo ? (
              <button
                onClick={() => setSelectedTodo(todo)}
                className="action-button"
              >
                Update
              </button>
            ) : (
              <button disabled className="action-button">
                Update
              </button>
            )}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="action-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
