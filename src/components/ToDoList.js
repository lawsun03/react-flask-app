import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem'
import ToDoInput from './TodoInput'

function ToDoList({todos}) {
//   const [currentTime, setCurrentTime] = useState(1)

//   useEffect(() => {
    
//     fetch('/time').then(res => res.json().then(data => {
//       setCurrentTime(data.time);
//     }))

//   },[])

  return (
    <div className='p-4'>
        <div className="w-[24.5rem] divide-y divide-slate-400/20 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-black/1 ring-1 ring-slate-700/10 shadow-2xl">

            {
                todos.map((todo, i) => {
                    return <ToDoItem todo={todo.todo} checked={todo.checked} key={i}/>
                })
            }

            <ToDoInput/>

        </div>
    </div>
  );
}

export default ToDoList;
