import TodoItem from "./TodoItem";

function TodoList({ todos }) {
    if (todos.length === 0) {
        return <p>No tasks yet. Add your first task!</p>;
    }

    return (
        <ul>
            {todos.map((todo, index) => (
                <TodoItem
                    key={index}
                    title={todo}
                />
            ))}
        </ul>
    );
}

export default TodoList;