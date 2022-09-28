import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem'
import ToDoInput from './TodoInput'

function ToDoList({todos, setTodos, setTodoList}) {

  return (
    <div className='p-4'>
        <div className="w-[24.5rem] divide-y divide-slate-400/20 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-black/1 ring-1 ring-slate-700/10 shadow-2xl">

            {
                todos.map((todo) => {
                    return <ToDoItem id={todo.id} setTodos={setTodos} todo={todo.todo} checked={todo.checked} key={todo.id}/>
                })
            }

            <ToDoInput todos={todos} setTodoList={setTodoList} setTodos={setTodos}/>

        </div>
    </div>
  );
}

export default ToDoList;
