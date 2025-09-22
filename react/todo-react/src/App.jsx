import { useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';

export default function App() {
  const [todos, setTodos]= useState([]);

  // Aggiungere un nuovo todo
  function addTodo(text) {
    const newTodo = {id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  }

  //Toggle completato
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
}

//Eliminare un todo
function deleteTodo(id) {
  setTodos(todos.filter((todo) => todo.id !== id));
}

const remaining = todos.filter((t) => !t.completed).length;

return (

  <main className='container'>
    <h1>Todo List</h1>

    <TodoForm onAdd={addTodo} />

    {todos.length === 0 ? (
      <p className="muted">Nessun todo. Aggiugnine uno!</p>

    ) : (
      <ul className="list">
        {todos.map((todo) => (

          <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    )}

    <p className="muted">Da fare: {remaining} {remaining === 1 ? "attività" : "attività"}</p>

  </main>

   );
}