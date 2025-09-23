// Il componente riceve due props:
// 1. favorites → array di oggetti contenente i titoli preferiti salvati
// 2. onSelect → funzione da chiamare quando un utente clicca su un titolo
export default function Favorites({ favorites, onSelect }) {

  // Controllo se l'array dei preferiti è vuoto
  // Se non ci sono elementi, ritorna null → il componente non renderizza nulla
  if (!favorites.length) return null;

  return (

    <div className="favorites">

      {/* Titolo della sezione */}
      <h3>I tuoi preferiti</h3>

      {/* Ciclo attraverso l'array dei preferiti con .map */}
      {favorites.map((f) => (
        // Ogni elemento del ciclo è un div con chiave unica "key" → React usa la chiave
        // per ottimizzare il rendering delle liste
        <div 
          key={f.id} // l'id dello show è unico → garantisce chiave stabile
          onClick={() => onSelect(f.id)} // funzione che chiama onSelect con l'id del titolo cliccato
        >
          {/* Mostra il titolo e l'anno di uscita */}
          {f.title} ({f.year})
        </div>
      ))}
    </div>
  );
}
