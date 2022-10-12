// action types
export const SET_LIST = "SET_LIST"
export const CREATE_TODO = "CREATE_TODO"
export const DELETE_TODO = "DELETE_TODO"

// action creators
export const setList = (list) => ({
    type: SET_LIST,
    payload: list,
});

export const createTask = (task) => ({
    type: CREATE_TODO,
    payload: task,
});

export const deleteTask = (id) => ({
    type: DELETE_TODO,
    payload: id,
});

// Server API calls
export const getAllTodoList = async () => {
    const response = await fetch('/tasks')
    
    if (response.ok) {
        const tasks = await response.json()
        return tasks
    } else {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
}

export async function createNewTodo(task) {
    try {
        const response = await fetch('/addtask', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })

        const data = await response.json()
        return task
    } catch (e) {
        console.log(e)
    }
}

export async function deleteTodo(id) {
    
    try {
        const response = await fetch(`/deletetask/${id}`, {
            method: 'DELETE',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    
    const deleteMessage = await response.text()
} catch (e) {
    console.log(e)
}
}

export const updateTask = async (task) => {
    try {
        const response = await fetch(`/updatetask/${task.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })
        
        const updatedTask = await response.json()
        return updatedTask
    } catch (e) {
        console.log(e)
    }
}

// Dispatch Actions
export const setTodoList = (list = null) => async (dispatch) => {
    
    if (!list) {
        const todos = await getAllTodoList()
        dispatch(setList(todos.tasks))
        return todos
    } else {
        dispatch(setList(list))
        return list
    }

}

export const startCreateTask = (task) => async (dispatch) => {
    dispatch(createTask(task))
    await createNewTodo(task)
    console.log('Task Created!')
}

export const startDeleteTask = (id) => async (dispatch) => {
    dispatch(deleteTask(id))
    await deleteTodo(id)
    console.log('Task Deleted!')
}