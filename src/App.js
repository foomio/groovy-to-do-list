import React, { useState, useEffect } from 'react';
import './App.css'
function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const addTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, task]);
      setTask('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const formattedDate = currentDate.toDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  return (
    <div>
      <h1>Neon Kawaii To-Do List</h1>
      <div id="date-time">
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
      </div>
      <input
        type="text"
        placeholder="Add a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
