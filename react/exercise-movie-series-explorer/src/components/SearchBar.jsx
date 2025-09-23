// Importiamo l'hook useState da React
// useState permette di dichiarare e gestire uno stato locale all'interno del componente
import { useState } from "react";

// Dichiarazione del componente funzionale SearchBar
// Riceve come prop onSearch, una funzione che viene chiamata ogni volta che l'utente scrive qualcosa
export default function SearchBar({ onSearch }) {
  
  // Dichiarazione dello stato query con useState
  // query conterrà il testo digitato dall'utente nella barra di ricerca
  // setQuery è la funzione per aggiornare questo stato
  // L'inizializziamo con una stringa vuota ""
  const [query, setQuery] = useState("");

  // Il componente ritorna il JSX da renderizzare
  return (

    // Contenitore principale della barra di ricerca
    <div className="search-bar">

      {/* Input di tipo testo per la ricerca */}
      <input
        type="text"                             // Tipo di input: testo
        placeholder="Cerca film o serie..."    // Testo di suggerimento quando l'input è vuoto
        value={query}                           // Valore controllato: legato allo stato query
        onChange={(e) => {                      // Evento chiamato ogni volta che l'utente scrive qualcosa
          setQuery(e.target.value);             // Aggiorna lo stato locale query con il nuovo valore digitato
          onSearch(e.target.value);             // Chiama la funzione passata come prop per eseguire la ricerca con il nuovo testo
        }}
      />
    </div>
  );
}

