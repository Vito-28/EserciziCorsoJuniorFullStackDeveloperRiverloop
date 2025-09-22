// Questo componente riceve: 
// - categories: lista delle categorie da mostrare
// - selected: categoria attualmente selezionata
// - onSelect: funzione da richiamare quando clicchiamo su un bottone

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div style={{ margin: "10px 0" }}>
      {categories.map((cat) => (
        <button
          key={cat} // ogni bottone ha key univoca (qui la categoria stessa)
          onClick={() => onSelect(cat)} // aggiorna la categoria selezionata
          style={{
            // evidenzia la categoria attiva in grassetto
            fontWeight: selected === cat ? "bold" : "normal",
            marginRight: 8
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
