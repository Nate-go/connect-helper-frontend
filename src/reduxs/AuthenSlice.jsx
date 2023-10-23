import { createSlice } from '@reduxjs/toolkit';

const AuthenSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setAuthen, clearAuthen } = AuthenSlice.actions;
export const selectAuthen = (state) => state.user.user;
export default AuthenSlice.reducer;