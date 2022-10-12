import React, { useState, useEffect } from 'react'
import { updateTask, startDeleteTask } from '../store/actions/todoList'
import { connect } from 'react-redux'

function ToDoItem({ 
  startDeleteTask,
  id, 
  todo, 
  checked, 
  order, 
  provided, 
  innerRef, 
  isDragging,
}) {
  const [_checked, _setChecked] = useState(checked)

  const updateCheck = async () => {

    const updatedTask = {
      id: id,
      todo: todo,
      checked: !_checked,
      order: order,
    }

    _setChecked(!_checked)

    updateTask(updatedTask)

  }

  return (
    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef}>
      <div id={id} className={`todo-item p-4 ${isDragging ? 'dragging' : null}`}  >
        <div className='flex '>
          <input onChange={updateCheck} id="default-checkbox" type="checkbox" className="mr-2 w-5 h-5 rounded-full" checked={_checked ? _checked : false} />
          {todo ? todo : null}
        </div>

        <span onClick={() => startDeleteTask(id)} className='text-red-500 cursor-pointer'>
          X
        </span>

        {provided.placeholder}
      </div>
    </div>
  );
}

export default connect(null, { startDeleteTask })(ToDoItem);
