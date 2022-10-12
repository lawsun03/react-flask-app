import React, { useState, useEffect } from 'react';
import ToDoList from './components/ToDoList';
import './assets/App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header pt-5">
        To-Do List
        <ToDoList />
      </header>
    </div>
  )
}


export default (App)