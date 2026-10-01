
import {
    useState,
    useContext
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import UserContext from "../../UserContext";
import {
    addTask,
    toggleTask,
    removeTask
} from "../../features/taskManager/taskSlice";

function TaskManager() {
    const [input, setInput] = useState("");

    const dispatch = useDispatch();
    const user = useContext(UserContext);

    const tasks = useSelector(
        (state) => state.tasks.tasks
    );

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.completed
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    return (
        <div>
            <h2>Task Manager</h2>

            <p>
              Welcome, {user.name} ({user.role})
            </p>

            <div>
               <p>Total Tasks: {totalTasks}</p>
               <p>Completed: {completedTasks}</p>
               <p>Pending: {pendingTasks}</p>
            </div>

            <input
                type="text"
                value={input}
                onChange={(event) =>
                    setInput(event.target.value)
                }
                placeholder="Enter a task"
            />

            <button
                onClick={() => {
                    if (input.trim() === "") {
                        return;
                    }

                    dispatch(addTask(input));
                    setInput("");
                }}
            >
                Add Task
            </button>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>

                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() =>
                                dispatch(
                                    toggleTask(task.id)
                                )
                            }
                        />

                        {task.title}

                        <button
                            onClick={() =>
                                dispatch(
                                    removeTask(task.id)
                                )
                            }
                        >
                            Delete
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;
