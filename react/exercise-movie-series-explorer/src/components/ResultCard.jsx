// Il componente riceve due props:
// item: un oggetto che rappresenta un singolo show/film (id, title, year, poster, ecc.)
// onSelect: una funzione da chiamare quando l'utente clicca sulla card
export default function ResultCard({ item, onSelect }) {

  return (

    // Contenitore principale della card
    // Al click chiamiamo la funzione onSelect passando l'id dello show
    <div className="result-card" onClick={() => onSelect(item.id)}>
      
      {/* Immagine del poster */}
      {/* Se item.poster esiste viene mostrato, altrimenti viene mostrata un'immagine di fallback */}
      {/* alt è importante per accessibilità e SEO: descrive l'immagine */}
      <img src={item.poster || "../assets/no-image.png"} alt={item.title} />
      
      {/* Titolo dello show */}
      
      <h3>{item.title}</h3>
      
      {/* Anno di uscita o di prima trasmissione */}
      <span>{item.year}</span>
    </div>
  );
}
