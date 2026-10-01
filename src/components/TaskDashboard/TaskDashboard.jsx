import {
    useState,
    useContext
} from "react";

import AuthContext from "../../AuthContext";
import useTasks from "../../hooks/useTasks";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
function TaskDashboard() {
    const {
        user,
        setIsAuthenticated
    } = useContext(AuthContext);

    const {
        tasks,
        setTasks,
        loading,
        error
    } = useTasks();
    const [newTask, setNewTask] = useState("");

    

    // POST - Add Task
    async function handleAddTask(event) {
        event.preventDefault();

        if (newTask.trim() === "") {
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/todos`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        title: newTask,
                        completed: false,
                        userId: 1
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to create task"
                );
            }

            const data = await response.json();

            console.log(
                "Created task:",
                data
            );

            setTasks((previousTasks) => [
                data,
                ...previousTasks
            ]);

            setNewTask("");
        } catch (error) {
            console.error(
                "Failed to create task:",
                error
            );
        }
    }

    // PATCH - Complete / Undo Task
    async function handleToggleTask(task) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/todos/${task.id}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        completed:
                            !task.completed
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to update task"
                );
            }

            const updatedTask =
                await response.json();

            console.log(
                "Updated task:",
                updatedTask
            );

            setTasks((previousTasks) =>
                previousTasks.map(
                    (currentTask) =>
                        currentTask.id ===
                        task.id
                            ? {
                                ...currentTask,
                                completed:
                                    updatedTask.completed
                            }
                            : currentTask
                )
            );
        } catch (error) {
            console.error(
                "Failed to update task:",
                error
            );
        }
    }

    // DELETE - Delete Task
    async function handleDeleteTask(task) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/todos/${task.id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to delete task"
                );
            }

            setTasks((previousTasks) =>
                previousTasks.filter(
                    (currentTask) =>
                        currentTask.id !==
                        task.id
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete task:",
                error
            );
        }
    }

    return (
        <div>
            <h1>Task Dashboard</h1>

            {/* Authenticated User */}
            <p>
                Welcome, {user.name} ({user.role})
            </p>

            {/* Logout */}
            <button
                type="button"
                onClick={() =>
                    setIsAuthenticated(false)
                }
            >
                Logout
            </button>

            {/* Admin-only UI */}
            {user.role === "admin" && (
                <div>
                    <h2>Admin Actions</h2>

                    <button type="button">
                        Manage All Tasks
                    </button>
                </div>
            )}

            <p>
                Tasks loaded: {tasks.length}
            </p>

            {/* Add Task */}
            <form onSubmit={handleAddTask}>
                <label htmlFor="new-task">New Task</label>
                <input
                    id="new-task"
                    type="text"
                    value={newTask}
                    onChange={(event) =>
                        setNewTask(event.target.value)
                    }
                    placeholder="Enter a new task"
                />

                <button type="submit">
                    Add Task
                </button>
            </form>

            {/* Loading State */}
            {loading && (
                <LoadingMessage message="Loading tasks..." />
            )}

            {/* Error State */}
            {error && (
                <p>
                    {error}
                </p>
            )}

            {/* Empty State */}
            {!loading &&
                !error &&
                tasks.length === 0 && (
                    <p>
                        No tasks available.
                    </p>
                )}

            {/* Task List */}
            {tasks.length > 0 && (
                <ul>
                    {tasks
                        .slice(0, 10)
                        .map((task) => (
                            <li key={task.id}>
                                {task.title}

                                {" "}

                                {/* Complete / Undo */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleToggleTask(
                                            task
                                        )
                                    }
                                >
                                    {task.completed
                                        ? "Undo"
                                        : "Complete"}
                                </button>

                                {" "}

                                {/* Delete */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteTask(
                                            task
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

export default TaskDashboard;