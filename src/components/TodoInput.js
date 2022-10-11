import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

function ToDoInput({ todos, setTodoList, setTodos }) {
    const [newTask, setNewTask] = useState('')

    const createNewTodo = async (e) => {
        e.preventDefault()
        const id = uuid()

        const newTodo = {
            id: id,
            todo: newTask,
            checked: false,
            order: todos[todos.length - 1] ? todos[todos.length - 1].order + 1 : 1
        }

        console.log('newTodo', newTodo)
        setNewTask('')
        setTodoList([...todos, newTodo])

        try {
            const response = await fetch('/addtask', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo)
            })

            const data = await response.json()
            console.log('newTodo',newTodo)
            console.log('response', data)
        } catch (e) {
            console.log(e)
        }

    }

    return (

        <div>
            <form onSubmit={ (e) => createNewTodo(e)}>
                <div className='p-4 flex content-center'>
                    <input onChange={(e) => setNewTask(e.target.value)} value={newTask} type="text" className="todo-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add a new task..." required />
                    <button type="submit" className="todo-button text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm  text-center items-center dark:focus:ring-gray-500 mr-2">
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ToDoInput;