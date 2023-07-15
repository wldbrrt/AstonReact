import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: 0,
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGame(state, action) {
            state.id = action.payload.id
        },
    },
})

export const { setGame } = gameSlice.actions

export default gameSlice.reducer
