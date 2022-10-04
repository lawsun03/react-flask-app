import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem'
import ToDoInput from './TodoInput'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

function ToDoList({todos, setTodos, setTodoList}) {

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setTodoList(items)
  }

  return (
    <div className='p-4'>
        <div className="w-[24.5rem] divide-y divide-slate-400/20 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-black/1 ring-1 ring-slate-700/10 shadow-2xl">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='todos'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    todos.map((todo, index) => {
                      return (
                        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                          {(provided) => (
                            <ToDoItem provided={provided} id={todo.id} setTodos={setTodos} todo={todo.todo} checked={todo.checked} />
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

          <ToDoInput todos={todos} setTodoList={setTodoList} setTodos={setTodos}/>

        </div>
    </div>
  );
}

export default ToDoList;
