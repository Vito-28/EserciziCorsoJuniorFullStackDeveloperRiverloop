// Questo è un componente React che mostra un menu a tendina per scegliere un genere
export default function GenreFilter({ results, value, onChange }) {

  // Creiamo una lista di generi senza ripetizioni
  // "All" è sempre la prima opzione
  // results.flatMap(...) prende tutti i generi dai risultati
  // new Set(...) elimina i duplicati
  const genres = ["All", ...new Set(results.flatMap(r => r.genres || []))];

  return (
    <select
      // Qui diciamo quale opzione è selezionata
      value={value}
      // Questa funzione si attiva quando cambiamo opzione
      // Chiama la funzione onChange che ci viene passata e le dà il nuovo valore
      onChange={(e) => onChange(e.target.value)}
    >
      {/* Qui creiamo una riga del menu per ogni genere */}
      {genres.map((g) => (
        <option key={g} value={g}>
          {/* Mostriamo il nome del genere */}
          {g}
        </option>
      ))}
    </select>
  );
}

