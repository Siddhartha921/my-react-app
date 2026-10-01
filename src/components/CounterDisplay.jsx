import { useSelector } from "react-redux";

function CounterDisplay() {
    const count = useSelector(
        (state) => state.counter.value
    );

    return (
        <div>
            <h2>Counter Display</h2>
            <p>Count: {count}</p>
        </div>
    );
}

export default CounterDisplay;