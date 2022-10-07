import React, { useState, useEffect } from 'react';
// import './assets/App.css';

function ToDoItem({ deleteTodo, id, todo, checked, order, provided, innerRef, isDragging }) {
  const [_checked, _setChecked] = useState(checked)
  const [deleted, setDeleted] = useState(false)

  const updateCheck = async () => {

    const updateTask = {
      todo: todo,
      checked: !_checked,
      order: order,
    }

    _setChecked(!_checked)

    try {
      const response = await fetch(`/updatetask/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTask)
      })

      const updatedTask = await response.json()
      console.log(updateTask)
    } catch (e) {
      console.log(e)
    }

  }

  return (!deleted ?
    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef}>
      {/* <hr></hr> */}
      <div id={id} className={`todo-item p-4 ${isDragging ? 'dragging' : null}`}  >
        <div className='flex '>
          <input onChange={updateCheck} id="default-checkbox" type="checkbox" className="mr-2 w-5 h-5 rounded-full" checked={_checked ? _checked : false} />
          {todo ? todo : null}
        </div>

        <span onClick={() => deleteTodo(id)} className='text-red-500 cursor-pointer'>
          X
        </span>

        {provided.placeholder}
      </div>
      {/* <hr></hr> */}
    </div>
    : null
  );
}

export default ToDoItem;
