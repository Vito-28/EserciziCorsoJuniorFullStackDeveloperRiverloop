// Importiamo il componente ResultCard che rappresenta un singolo risultato della lista
import ResultCard from "./ResultCard";

// Definiamo il componente ResultsList come funzione
// Riceve due props
// results: un array di oggetti, ciascuno rappresenta un film/serie
// onSelect: funzione da chiamare quando l'utente clicca su un elemento
export default function ResultsList({ results, onSelect }) {

  // Controllo: se l'array results è vuoto
  // allora ritorniamo un paragrafo che mostra Nessun risultato
  // Questo gestisce il caso in cui la ricerca non restituisce nulla
  if (!results.length) return <p>Nessun risultato</p>;

  // Altrimenti, restituiamo la lista dei risultati
  return (
    // Contenitore principale della lista dei risultati
    <div className="results-list">

      {/* Mappiamo l'array results per renderizzare ogni elemento */}

      {results.map((item) => (

        // Per ogni elemento chiamiamo ResultCard passando:
        // key: un identificatore unico per React, necessario per ottimizzare il rendering
        // item: l'oggetto che contiene le informazioni del film/serie
        // onSelect: funzione da chiamare quando l'utente seleziona il risultato
        <ResultCard key={item.id} item={item} onSelect={onSelect} />
        
      ))}

    </div>
  );
}
