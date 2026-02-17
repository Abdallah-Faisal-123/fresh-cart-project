import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState, User } from "@/types"

const initialState: AuthState = {
    isAuthenticated: false,
    userInfo: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthInfo: (state, action: PayloadAction<AuthState>) => {
            state.isAuthenticated = action.payload.isAuthenticated
            state.userInfo = action.payload.userInfo
        }
    }
})

export const authReducer = authSlice.reducer
export const { setAuthInfo } = authSlice.actions
