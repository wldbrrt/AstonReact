import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    token: null,
    id: null,
    isAuth: false,
    isAuthenticating: true,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
            state.isAuth = true
            state.isAuthenticating = false
        },
        removeUser(state) {
            state.email = null
            state.token = null
            state.id = null
            state.isAuth = false
            state.isAuthenticating = false
        },
    },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
