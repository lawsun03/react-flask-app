import {
    SET_USER,
    LOGOUT_USER,
} from './actions/user'

const initialState = {}

export function userReducer (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return action.payload
        default:
            return state
    }
}
