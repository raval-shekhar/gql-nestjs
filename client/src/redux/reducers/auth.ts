import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IUserResponse, IAuthState} from 'apollo/type/user';

const initialState: IAuthState = {
  user: null,
  loading: false
}

const demoSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<IUserResponse>) {
      return {
        ...state,
        user: action.payload
      }
    },
  }
});

export const { setAuthData } = demoSlice.actions;

export default demoSlice.reducer;
