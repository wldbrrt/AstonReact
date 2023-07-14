import userReducer from './slices/user'
import { gamesApi } from './slices/gamesAPI';
import { reducer as formReducer } from 'redux-form';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    user: userReducer,
    form: formReducer,
    [gamesApi.reducerPath]: gamesApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(gamesApi.middleware)
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
