import { useState } from "react";

function TodoForm({ onAddTodo }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        if (input.trim() === "") {
            setError("Task cannot be empty");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            onAddTodo(input);
            setInput("");
            setError("");
            setIsLoading(false);
        }, 1000);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(event) => {
                    setInput(event.target.value);
                    setError("");
                }}
                placeholder="Enter a task"
            />

            {error && <p>{error}</p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Todo"}
            </button>
        </form>
    );
}

export default TodoForm;