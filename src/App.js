import React, { useState, useEffect } from 'react';
import ToDoList from './components/ToDoList'
import './assets/App.css';

// data = [{todo: string, checked: boolean}]

function App() {
  const [currentTime, setCurrentTime] = useState(1)
  const [todoList, setTodoList] = useState([
    {
      todo: 'Feed Brutus',
      checked: true,
    },
    {
      todo: 'Feed Kiki',
      checked: true,
    },
    {
      todo: 'Vacuum the house',
      checked: false,
    },
])

  useEffect(() => {
    
    fetch('/addtask')
    .then(res => res.json()
    .then(data => {
      console.log(data)
    }))

  },[])

  return (
    <div className="App">
      <header className="App-header pt-5">
        To-Do List
        <ToDoList todos={todoList}/>
      </header>
    </div>
  );
}

export default App;
