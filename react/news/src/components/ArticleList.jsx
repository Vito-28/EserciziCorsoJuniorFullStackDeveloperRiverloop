import ArticleItem from "./ArticleItem";

// Questo componente si occupa solo di stampare la lista di articoli
// Props: 
// - articles -> array di articoli filtrati
// - onSelect -> funzione che verrà passata ad ArticleItem per aprire i dettagli
// - selectedArticle -> articolo attualmente selezionato (per evidenziare)
// - favorites -> array di ID articoli preferiti
// - onToggleFav -> funzione che aggiunge/rimuove articoli dai preferiti

export default function ArticleList({ articles, onSelect, selectedArticle, favorites, onToggleFav }) {
  // Se non ci sono articoli, mostra un messaggio
  if (!articles.length) {
    return <p>Nessun articolo trovato.</p>;
  }

  return (
    <ul style={{ paddingLeft: 18 }}>
      {articles.map((a) => (
        <ArticleItem
          key={a.id}                                // chiave unica per React
          article={a}                               // passa l'oggetto articolo
          onSelect={onSelect}                       // callback per aprire dettagli
          active={selectedArticle?.id === a.id}     // evidenzia se selezionato
          isFav={favorites?.includes(a.id) ?? false} // evita errori se favorites è undefined
          onToggleFav={onToggleFav}                 // callback toggle preferiti
        />
      ))}
    </ul>
  );
}
