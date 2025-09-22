// Bottone toggle preferiti
// Props:
// - id: identificativo dell’articolo
// - isFav: true se l’articolo è nei preferiti
// - onToggle: funzione da chiamare per aggiungere/rimuovere l’articolo
export default function FavoriteButton({ id, isFav, onToggle }) {
  return (
    <button
      onClick={() => onToggle(id)} // chiama la funzione passata dal parent
      aria-pressed={isFav}         // accessibilità: indica se è attivo
      title={isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      style={{ marginLeft: 8 }}
    >
      {isFav ? "⭐ Rimuovi dai preferiti" : "☆ Aggiungi ai preferiti"}
    </button>
  );
}
