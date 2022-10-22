import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { todoListReducer } from "./todoList"
import { userReducer } from "./user"

export const store = createStore(
    combineReducers({
        todoList: todoListReducer,
        user: userReducer,
    }),
    applyMiddleware(thunk)
);