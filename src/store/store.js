import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { todoListReducer } from "./todoList"

export const store = createStore(
    combineReducers({
        todoList: todoListReducer,
    }),
    applyMiddleware(thunk)
);