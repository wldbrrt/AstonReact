import userReducer from './slices/user'
import { reducer as formReducer } from 'redux-form';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    user: userReducer,
    form: formReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
