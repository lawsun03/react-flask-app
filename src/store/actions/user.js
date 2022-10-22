// action types
export const SET_USER = "SET_USER"
export const LOGOUT_USER = "LOGOUT_USER"

// action creators
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

// Dispatch Actions
export const startSetUser = (user) => async (dispatch) => {
    dispatch(setUser(user))
    return user
}
