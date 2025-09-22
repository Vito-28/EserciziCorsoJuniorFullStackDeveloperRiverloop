import { useState } from "react";

export default function TodoForm({ onAdd }) {
    const [text, setText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!text.trim()) return;   // Evita todo vuoti
        onAdd(text.trim());
        setText("");   // Reset input
    } 
    

    return (
        <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Aggiungi una attività..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Aggiungi</button>
        
        </form>
    );
}