import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem'
import ToDoInput from './TodoInput'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

function ToDoList({ todos, setTodos, setTodoList, deleteTodo }) {

  async function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index, 1)

    let referenceIndMinus = items[result.destination.index - 1] ? items[result.destination.index - 1].order : 0
    let referenceIndPlus = items[result.destination.index] ? items[result.destination.index].order : result.destination.index + 1
    let newOrder = referenceIndMinus + ((referenceIndPlus - (referenceIndMinus)) / 2)

    reorderedItem.order = newOrder

    items.splice(result.destination.index, 0, reorderedItem)

    setTodoList(items)

    const updateTask = {
      todo: reorderedItem.todo,
      checked: reorderedItem.checked,
      order: newOrder,
    }

    try {
      const response = await fetch(`/updatetask/${reorderedItem.id}`, {
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

  return (
    <div className='pt-5 todo-container'>
      <div className="divide-y divide-slate-400/20 bg-white leading-5 shadow-2xl todo-box">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='todos'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {
                  todos.map((todoItem, index) => {
                    console.log(todoItem)
                    const { id, checked, todo, order } = todoItem

                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided, snapshot) => (
                          <ToDoItem
                            isDragging={snapshot.isDragging}
                            innerRef={provided.innerRef}
                            provided={provided}
                            id={id}
                            setTodos={setTodos}
                            todo={todo}
                            checked={checked}
                            deleteTodo={deleteTodo}
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

        <ToDoInput todos={todos} setTodoList={setTodoList} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default ToDoList;
