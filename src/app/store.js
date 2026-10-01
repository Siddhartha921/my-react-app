import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import todosReducer from "../features/todos/todosSlice";
import taskReducer from "../features/taskManager/taskSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todosReducer,
        tasks: taskReducer
    }
});