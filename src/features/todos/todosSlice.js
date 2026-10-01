import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
        );

        const data = await response.json();

        return data;
    }
);

const todosSlice = createSlice({
    name: "todos",

    initialState: {
        items: [],
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
    }
});
export default todosSlice.reducer;