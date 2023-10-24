import { configureStore } from '@reduxjs/toolkit';
import AuthenReducer from './AuthenSlice';

const Store = configureStore({
    reducer: {
        auth: AuthenReducer,
    },
});

export default Store