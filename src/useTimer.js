import { useState, useEffect } from "react";

function useTimer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    function start() {
        setIsRunning(true);
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setSeconds(0);
        setIsRunning(false);
    }

    return {
        seconds,
        isRunning,
        start,
        stop,
        reset
    };
}

export default useTimer;