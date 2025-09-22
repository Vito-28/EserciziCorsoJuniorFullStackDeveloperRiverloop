// Questo componente mostra i dettagli di un singolo articolo selezionato
// Props:
// - article -> articolo selezionato
// - onBack -> funzione da chiamare per tornare alla lista
// - isFav -> booleano, true se l'articolo è nei preferiti
// - onToggleFav -> funzione che aggiunge/rimuove l'articolo dai preferiti

import { formatDate } from "./utils/date";

export default function ArticleDetail({ article, onBack, isFav, onToggleFav }) {
  // Se article è null/undefined, non mostra nulla
  if (!article) return null;

  return (
    <div style={{ marginTop: 16 }}>
      {/* Titolo articolo */}
      <h2>{article.title}</h2>

      {/* Categoria e data */}
      <p style={{ marginTop: 0 }}>
        <em>{article.category}</em> ·{" "}
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </p>

      {/* Contenuto articolo */}
      <p>{article.content}</p>

      {/* Pulsanti di azione */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Torna alla lista */}
        <button onClick={onBack}>← Torna indietro</button>

        {/* Aggiungi/rimuovi dai preferiti */}
        <button
          onClick={() => onToggleFav(article.id)}
          aria-pressed={isFav} // migliora accessibilità
        >
          {isFav ? "⭐ Rimuovi dai preferiti" : "☆ Aggiungi ai preferiti"}
        </button>
      </div>
    </div>
  );
}
