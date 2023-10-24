import Cookies from "js-cookie";
import { createSlice } from '@reduxjs/toolkit';

const AuthenSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: Cookies.get('auth'),
    },
    reducers: {
        setAuthen: (state, action) => {
            state.auth = action.payload;
            Cookies.set("auth", JSON.stringify(action.payload));
        },
        clearAuthen: (state) => {
            state.auth = null;
        },
    },
});

export const { setAuthen, clearAuthen } = AuthenSlice.actions;
export const selectAuthen = (state) => state.auth.user;
export default AuthenSlice.reducer;