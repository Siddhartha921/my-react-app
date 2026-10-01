import { useState } from "react";

function useCounter() {
    const [count, setCount] = useState(0);

    function increase() {
        setCount(count + 1);
    }

    function decrease() {
        setCount(count - 1);
    }

    return {
        count,
        increase,
        decrease
    };
}

export default useCounter;