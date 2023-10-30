import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import soundEffect from './assets/sounds/add.mp3';


function App() {
  const [todos, setTodos] = useState([]); 
  const [task, setTask] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const audioRef = useRef(null); // Add a ref for the audio element

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

      audioRef.current.play(); //play audio when the task is added

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
      <h1>Neon Groovy To-Do List</h1>

      <div id="date-time">
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
      </div>
      <input
        type="text"
        placeholder=""
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Add</button> 
      <audio ref={audioRef}>
        <source src={soundEffect} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
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
