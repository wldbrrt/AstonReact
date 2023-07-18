import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    token: null,
    id: null,
    history: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
        },
        removeUser(state) {
            state.email = null
            state.token = null
            state.id = null
            state.history = null
        },
        setUserHistory(state, action) {
            state.history = action.payload.history
        },
        removeUserHistory(state) {
            state.history = null
        },
    },
})

export const { setUser, removeUser, setUserHistory, removeUserHistory } =
    userSlice.actions

export default userSlice.reducer
