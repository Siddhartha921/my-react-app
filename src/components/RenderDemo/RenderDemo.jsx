import { useState, useMemo } from "react";
import MemoChild from "../MemoChild/MemoChild";

function RenderDemo() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Siddu");



    const squaredNumber = useMemo(() => {
        console.log("Calculating square...");

        return count * count;
    }, [count]);



    console.log("RenderDemo rendered");

    return (
        <div>
            <h2>Render Demo</h2>


            <p>Squared: {squaredNumber}</p>

            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>

            <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
            />

            <p>Hello, {name}</p>

            <MemoChild />
            
        </div>
    );
}

export default RenderDemo;