import { configureStore } from '@reduxjs/toolkit';
import AuthenReducer from './AuthenSlice';

const Store = configureStore({
    reducer: {
        user: AuthenReducer,
    },
});

export default Store