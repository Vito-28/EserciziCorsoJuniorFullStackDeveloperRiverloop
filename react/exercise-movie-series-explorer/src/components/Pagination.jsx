// Questo file crea un componente React chiamato Pagination
// Serve a mostrare i pulsanti per cambiare pagina

// Export di default: esporta questa funzione come componente principale del file
export default function Pagination({ page, totalPages, onChange }) {

  // Creiamo un array con tutti i numeri delle pagine
  // Array.from({ length: totalPages }, (_, i) => i + 1)
  // - { length: totalPages } fa un array vuoto della lunghezza giusta
  // - (_, i) => i + 1 trasforma ogni indice in numero di pagina (da 1 a totalPages)
  //   esempio: se totalPages = 5 => [1, 2, 3, 4, 5]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Ritorniamo il JSX, cioè il codice HTML che React renderizzerà
  return (
    // Un contenitore <div> con classe "pagination" per applicare lo stile
    <div className="pagination">
      {/* Per ogni numero di pagina nell'array, creiamo un pulsante */}
      {pages.map((p) => (
        <button
          // key serve a React per riconoscere ogni elemento della lista
          key={p}

          // Quando clicchiamo il pulsante, chiamiamo la funzione onChange
          // Passiamo il numero di pagina cliccato
          onClick={() => onChange(p)}

          // Se questo numero di pagina è quello corrente, aggiungiamo la classe "active"
          // Così possiamo evidenziare la pagina selezionata
          className={p === page ? "active" : ""}
        >
          {/* Mostriamo il numero della pagina dentro il bottone */}
          {p}
        </button>
      ))}
    </div>
  );
}