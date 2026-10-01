import { useState, useEffect, lazy, Suspense } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";

import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute/RoleProtectedRoute";

import TaskDashboard from "./components/TaskDashboard/TaskDashboard";

import { fetchTodos } from "./features/todos/todosSlice";

import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Login from "./pages/Login";
const Admin = lazy(() => import("./pages/Admin"));
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/profile";
import Settings from "./pages/Dashboard/Settings";

import Layout from "./pages/Layout/Layout";

import CounterDisplay from "./components/CounterDisplay";
import CounterControls from "./components/CounterControls";
import TaskManager from "./components/TaskManager/TaskManager";
import RenderDemo from "./components/RenderDemo/RenderDemo";

function App() {
    const API_URL = import.meta.env.VITE_API_URL;

    const dispatch = useDispatch();

    const reduxTodos = useSelector(
        (state) => state.todos.items
    );

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");

        return savedTodos
            ? JSON.parse(savedTodos)
            : [];
    });

    const [apiTodos, setApiTodos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem(
            "todos",
            JSON.stringify(todos)
        );
    }, [todos]);

    useEffect(() => {
        async function fetchExistingTodos() {
            try {
                const response = await fetch(
                    `${API_URL}/todos`
                );

                const data = await response.json();

                setApiTodos(data);
            } catch (error) {
                console.error(
                    "Failed to fetch todos:",
                    error
                );
            }
        }

        fetchExistingTodos();
    }, [API_URL]);

    function handleAddTodo(todo) {
        setTodos((previousTodos) => [
            ...previousTodos,
            todo
        ]);
    }

    return (
        <div>
            {/* Redux Counter */}
            <CounterDisplay />
            <CounterControls />
            <RenderDemo />

            {/* Task Manager */}
            <TaskManager />

            {/* Header */}
            <Header />

            {/* Navigation */}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>

            <button
                onClick={() => navigate("/about")}
            >
                Go to About
            </button>

            {/* Routes */}
            <Routes>
                <Route element={<Layout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="/products/:productId"
                        element={<Product />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    {/* Protected Dashboard */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            path="profile"
                            element={<Profile />}
                        />

                        <Route
                            path="settings"
                            element={<Settings />}
                        />
                    </Route>

                    {/* Protected Task Dashboard */}
                    <Route
                        path="/tasks"
                        element={
                            <ProtectedRoute>
                                <TaskDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Protected Route */}
                    <Route
                        path="/admin"
                        element={
                            <RoleProtectedRoute
                                allowedRole="admin"
                            >
                                <Admin />
                            </RoleProtectedRoute>
                        }
                    />

                    {/* 404 */}
                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Route>
            </Routes>

            <hr />

            {/* Todo App */}
            <h2>Todo App</h2>

            <TodoForm
                onAddTodo={handleAddTodo}
            />

            <TodoList
                todos={todos}
            />

            <hr />

            {/* API Todos */}
            <h2>API Todos</h2>

            <ul>
                {apiTodos
                    .slice(0, 5)
                    .map((todo) => (
                        <li key={todo.id}>
                            {todo.title}
                        </li>
                    ))}
            </ul>

            <hr />

            {/* Redux Todos */}
            <h2>Redux Todos</h2>

            <ul>
                {reduxTodos
                    .slice(0, 5)
                    .map((todo) => (
                        <li key={todo.id}>
                            {todo.title}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default App;