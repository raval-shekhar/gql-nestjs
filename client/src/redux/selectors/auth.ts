import { RootState } from '../reducers'

export const getValue = (state: RootState) => state.auth

export const getToken = (state: RootState) => state.auth.user?.token

