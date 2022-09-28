import React, { useState, useEffect } from 'react';
// import './assets/App.css';

function ToDoItem({todo, checked}) {
//   const [currentTime, setCurrentTime] = useState(1)

//   useEffect(() => {
    
//     fetch('/time').then(res => res.json().then(data => {
//       setCurrentTime(data.time);
//     }))

//   },[])

  return (
          <div className='todo-item p-4'>
            <input id="default-checkbox" type="checkbox" className="mr-2 w-5 h-5 rounded-full" checked={checked ? checked : false}/>
            {todo ? todo : null}
          </div>
  );
}

export default ToDoItem;
