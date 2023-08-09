import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialQueryState = { queryText: '' };

const querySlice = createSlice({
    name:'query',
    initialState: initialQueryState,
    reducers: {
        query(state, action) {
            state.queryText =  action.payload;
        }
    }
});

export const queryActions = querySlice.actions;

const store = configureStore({
    reducer: { query: querySlice.reducer }
});

export default store;