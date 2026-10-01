
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: []
};

const taskSlice = createSlice({
    name: "tasks",

    initialState,

    reducers: {
        // Add a new task
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                title: action.payload,
                completed: false
            });
        },

        // Toggle task completion
        toggleTask: (state, action) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload
            );

            if (task) {
                task.completed = !task.completed;
            }
        },

        // Remove a task
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        }
    }
});

export const {
    addTask,
    toggleTask,
    removeTask
} = taskSlice.actions;

export default taskSlice.reducer;
