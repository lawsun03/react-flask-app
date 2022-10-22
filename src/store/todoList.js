import {
    SET_LIST,
    CREATE_TODO,
    DELETE_TODO,
} from './actions/todoList'

const initialState = []

export function todoListReducer (state = initialState, action) {
    switch (action.type) {
        case SET_LIST:
            return action.payload
        case CREATE_TODO:
            return [...state, action.payload]
        case DELETE_TODO:
            return state.filter((todo) => todo.id !== action.payload)
        default:
            return state
    }
}

