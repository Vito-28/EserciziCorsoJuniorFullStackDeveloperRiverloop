// Input di ricerca testuale
// Props:
// - value -> valore attuale dell'input
// - onChange -> funzione chiamata a ogni digitazione dell'utente

export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)} // aggiorna lo stato nel parent
        placeholder="Cerca per titolo o contenuto"
        aria-label="Cerca articoli"
        style={{ padding: "6px 10px", width: "100%", maxWidth: 420 }}
      />
    </div>
  );
}
