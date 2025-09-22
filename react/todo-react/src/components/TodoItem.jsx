export default function TodoItem({ todo, onToggle, onDelete })  {
    return (
        <li className="todo">
          <span 
          className={todo.completed ? "done" : ""}
          onClick={onToggle}
          style={{ cursor: "pointer" }}
          >
            {todo.text}
        </span>
        <button onClick={onDelete}>X</button>
        </li>
    );
}