import React, { useState, useEffect } from 'react';

function ToDoInput({ todos, setTodoList, setTodos }) {
    const [newTask, setNewTask] = useState('')

    const createNewTodo = async (e) => {
        e.preventDefault()

        const newTodo = {
            todo: newTask,
            checked: false,
        }

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
            console.log(data)
            setNewTask('')
            setTodoList([...todos, newTodo])
        } catch (e) {
            console.log(e)
        }

    }

    return (

        <div>
            <form onSubmit={ (e) => createNewTodo(e)}>
                <div className='todo-item p-4'>
                    <input onChange={(e) => setNewTask(e.target.value)} value={newTask} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add a new task..." required />
                </div>

                <div className='todo-item pl-4'>
                    <button type="submit" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ToDoInput;