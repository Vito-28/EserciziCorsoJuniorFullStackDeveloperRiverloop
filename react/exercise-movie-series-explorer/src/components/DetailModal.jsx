// Esportiamo il componente React come default, riceve 4 props:
// detail: oggetto contenente i dettagli del titolo selezionato
// onClose: funzione per chiudere il modal
// onToggleFavorite: funzione per aggiungere/rimuovere dai preferiti
// isFavorite: booleano che indica se il titolo è già nei preferiti
export default function DetailModal({ detail, onClose, onToggleFavorite, isFavorite }) {

  // Se non è stato passato alcun dettaglio (detail è null o undefined),
  // non renderizziamo nulla e ritorniamo null
  if (!detail) return null;

  return (
    <div className="modal">

      {/* Bottone per chiudere il modal, esegue la funzione onClose al click */}
      <button onClick={onClose}>Chiudi</button>

      {/* Mostriamo l'immagine del titolo */}
      <img src={detail.poster} alt={detail.title} />

      {/* Titolo e anno di uscita */}
      <h2>{detail.title} ({detail.year})</h2>

      {/* Mostriamo la trama o il riassunto del titolo */}
      {/* dangerouslySetInnerHTML serve per interpretare HTML contenuto in summaryHTML */}
      <p dangerouslySetInnerHTML={{ __html: detail.summaryHTML }} />

      {/* Lista dei generi */}
      {/* detail.genres è un array → join(", ") converte l'array in stringa separata da virgole */}
      <p><strong>Generi:</strong> {detail.genres.join(", ")}</p>

      {/* Bottone per aggiungere o rimuovere dai preferiti */}
      {/* Al click esegue onToggleFavorite passando il dettaglio del titolo */}
      {/* Il testo del bottone cambia a seconda se è già un preferito */}
      <button onClick={() => onToggleFavorite(detail)}>
        {isFavorite ? "★ Rimuovi dai preferiti" : "☆ Aggiungi ai preferiti"}
      </button>
    </div>
  );
}
