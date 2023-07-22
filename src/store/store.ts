import userReducer from './slices/user'
import { userMiddleware } from './middleware/userMiddleware'
import { firestoreApi } from '../api/firestoreApi'
import { gamesApi } from '../api/gamesAPI'
import { reducer as formReducer } from 'redux-form'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        user: userReducer,
        form: formReducer,
        [gamesApi.reducerPath]: gamesApi.reducer,
        [firestoreApi.reducerPath]: firestoreApi.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(
            gamesApi.middleware,
            firestoreApi.middleware,
            userMiddleware
        )
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
