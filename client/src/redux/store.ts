import { configureStore, Action } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import thunk, { ThunkAction } from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import rootReducer, { RootState } from './reducers'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store