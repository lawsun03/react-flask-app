import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem'
import ToDoInput from './TodoInput'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { connect } from 'react-redux'
import { setTodoList, updateTask } from '../store/actions/todoList'

function ToDoList({ todoList, setTodoList }) {

  useEffect(() => {
    setTodoList()
  },[])

  async function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(todoList)
    const [reorderedItem] = items.splice(result.source.index, 1)

    let referenceIndMinus = items[result.destination.index - 1] ? items[result.destination.index - 1].order : 0
    let referenceIndPlus = items[result.destination.index] ? items[result.destination.index].order : result.destination.index + 1
    let newOrder = referenceIndMinus + ((referenceIndPlus - (referenceIndMinus)) / 2)

    reorderedItem.order = newOrder

    items.splice(result.destination.index, 0, reorderedItem)

    setTodoList(items)

    const updatedTask = {
      id: reorderedItem.id,
      todo: reorderedItem.todo,
      checked: reorderedItem.checked,
      order: newOrder,
    }

    updateTask(updatedTask)

  }

  return (
    <div className='pt-5 todo-container'>
      <div className="divide-y divide-slate-400/20 bg-white leading-5 shadow-2xl todo-box">
        <ToDoInput />

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='todos'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {
                  todoList.map((todoItem, index) => {
                    const { id, checked, todo, order } = todoItem

                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided, snapshot) => (
                          <ToDoItem
                            isDragging={snapshot.isDragging}
                            innerRef={provided.innerRef}
                            provided={provided}
                            id={id}
                            todo={todo}
                            checked={checked}
                            order={order} />
                        )}
                      </Draggable>
                    )
                  })
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todoList: state.todoList,
})

export default connect(mapStateToProps, {setTodoList})(ToDoList)
