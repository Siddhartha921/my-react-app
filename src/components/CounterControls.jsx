import { useDispatch } from "react-redux";
import {
    increment,
    decrement
} from "../features/counter/counterSlice";

function CounterControls() {
    const dispatch = useDispatch();

    
    return (
        <div>
            <h2>Counter Controls</h2>

            <button onClick={() => dispatch(increment())}>
                Increase
            </button>

            <button onClick={() => dispatch(decrement())}>
                Decrease
            </button>
        </div>
    );
}


export default CounterControls;