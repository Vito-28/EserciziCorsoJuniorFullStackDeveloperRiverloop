/* Componente che mostra una lista di risultati (film/serie) in forma di griglia.
 * Ogni risultato viene visualizzato come una ResultCard e viene animato con framer-motion.
 * Riceve:
 * results: array di oggetti risultato
 * onSelect: funzione chiamata quando l'utente clicca su un item
 */

// Importiamo il componente ResultCard, che si occupa di mostrare ogni singolo risultato come card
import ResultCard from "./ResultCard";

// Importiamo motion da framer-motion per fare animazioni sui componenti React
import { motion } from "framer-motion";

// Definiamo e esportiamo il componente principale ResultsList
export default function ResultsList({ results, onSelect }) {
  // Controlliamo se l'array dei risultati è vuoto
  // Se sì, mostriamo un messaggio semplice
  if (!results.length) return <p>Nessun risultato</p>;

  // Se ci sono risultati, li mostriamo in una griglia
  return (
    // Div principale con classe CSS 'results-grid' per layout a griglia
    <div className="results-grid">
      {/**
       * Cicliamo tutti i risultati usando .map()
       * Per ogni item creiamo un contenitore animato con motion.div
       */}
      {results.map((item) => (
        // motion.div ci permette di animare il contenitore
        <motion.div
          // Ogni elemento della lista deve avere una key unica
          key={item.id}

          // layout abilita animazioni automatiche quando la posizione degli elementi cambia
          layout

          // initial: stato iniziale dell'animazione (trasparente e spostato in basso)
          initial={{ opacity: 0, y: 20 }}

          // animate: stato finale dell'animazione (completamente visibile e al posto giusto)
          animate={{ opacity: 1, y: 0 }}

          // exit: come l'elemento scompare quando viene rimosso
          exit={{ opacity: 0 }}
        >
          {/**
           * Inseriamo la card con i dati del risultato
           * Passiamo `item` e la funzione `onSelect` come props
           */}
          <ResultCard item={item} onSelect={onSelect} />
        </motion.div>
      ))}
    </div>
  );
}
