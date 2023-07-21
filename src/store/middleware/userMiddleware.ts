import { setUser, removeUser } from '../slices/user'
import { AnyAction, Middleware } from '@reduxjs/toolkit'

export const userMiddleware: Middleware =
    store => next => (action: AnyAction) => {
        if (action.type === removeUser.type) {
            localStorage.clear()
        }

        if (action.type === setUser.type) {
            localStorage.setItem('UserData', JSON.stringify(action.payload))
            return next(action)
        }

        return next(action)
    }
