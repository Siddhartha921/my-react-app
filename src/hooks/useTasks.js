import { useState } from "react";

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    return {
        tasks,
        setTasks,
        loading,
        error
    };
}

export default useTasks;