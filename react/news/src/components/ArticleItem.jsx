// Componente per un singolo articolo nella lista
// Props: 
// - article -> l'oggetto articolo da mostrare 
// - onSelect -> funzione da chiamare quando clicchiamo "Leggi di più"
// - active, isFav, onToggleFav -> props per evidenziare e gestire preferiti

import { formatDate } from "./utils/date";
import FavoriteButton from "./FavoriteButton";

export default function ArticleItem({ article, onSelect, active, isFav, onToggleFav }) {
  return (
    <li
      style={{
        margin: "10px 0",
        padding: "8px 10px",
        borderRadius: 8,
        border: active ? "2px solid #0ea5e9" : "1px solid #ddd",
        background: active ? "#e0f2fe" : "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div>
          <h3 style={{ margin: "4px 0" }}>{article.title}</h3>
          <p style={{ margin: 0, color: "#555" }}>
            <em>{article.category}</em> ·{" "}
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
        </div>

        <FavoriteButton id={article.id} isFav={isFav} onToggle={onToggleFav} />
      </div>

      <button style={{ marginTop: 8 }} onClick={() => onSelect(article)}>
        Leggi di più
      </button>
    </li>
  );
}
