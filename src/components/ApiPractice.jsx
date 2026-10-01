import { useState } from "react";
import axios from "axios";

function ApiPractice() {
    const [title, setTitle] = useState("");
    const [result, setResult] = useState(null);

    async function updateTodo() {
        const response = await axios.put(
            "https://jsonplaceholder.typicode.com/todos/1",
            {
                id: 1,
                title: title,
                completed: true,
                userId: 1
            }
        );

        setResult(response.data);
    }

    return (
        <div>
            <h2>PUT Request Practice</h2>

            <input
                type="text"
                value={title}
                onChange={(event) =>
                    setTitle(event.target.value)
                }
                placeholder="Enter new title"
            />

            <button onClick={updateTodo}>
                Update Todo
            </button>

            {result && (
                <div>
                    <h3>Updated Todo</h3>
                    <p>ID: {result.id}</p>
                    <p>Title: {result.title}</p>
                    <p>
                        Completed:{" "}
                        {result.completed ? "Yes" : "No"}
                    </p>
                </div>
            )}
        </div>
    );
}

export default ApiPractice;