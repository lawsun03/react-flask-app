import React, { useState, useEffect } from 'react';
import ToDoList from './components/ToDoList';
import './assets/App.css';

function App() {
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    setTodos()
  },[])

  async function deleteTodo(id) {

    setTodoList(todoList.filter((todo) => todo.id !== id))
    
      try {
        const response = await fetch(`/deletetask/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
  
        const deleteMessage = await response.text()
        console.log(deleteMessage)
      } catch (e) {
        console.log(e)
      }
  }

  // set the todos to todo state
   async function setTodos() {
    try {
      const todos = await getTodos()
      console.log(todos)
      setTodoList(todos.tasks)
    } catch(e) {
      console.log(e)
    }

  }

  // gets all todos
  async function getTodos() {
    const response = await fetch('/tasks')
    
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

  }

  return (
    <div className="App">
      <header className="App-header pt-5">
        To-Do List
        <ToDoList todos={todoList} setTodoList={setTodoList} deleteTodo={deleteTodo} setTodos={setTodos}/>
      </header>
    </div>
  );
}

export default App;
