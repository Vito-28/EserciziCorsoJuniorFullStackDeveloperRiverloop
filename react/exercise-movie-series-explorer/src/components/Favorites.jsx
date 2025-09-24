import ResultCard from "./ResultCard";  // Importo il componente ResultCard che userò per mostrare ogni preferito
import { motion } from "framer-motion";  // Importo 'motion' da framer-motion per aggiungere animazioni alle card

// Il componente riceve due props:
// 1. favorites → array di oggetti contenente i titoli preferiti salvati
// 2. onSelect → funzione da chiamare quando un utente clicca su un titolo
export default function Favorites({ favorites, onSelect }) {  // Definisco il componente Favorites come funzione

  // Filtriamo i preferiti per rimuovere eventuali elementi vuoti o non validi
  const validFavorites = favorites.filter(favorite =>  // Creo un nuovo array con solo gli elementi validi
    favorite &&  // Controllo che l'elemento esista
    favorite.id &&  // Controllo che abbia un id
    favorite.title  // Controllo che abbia un titolo
  );

  // Controllo se l'array dei preferiti validi è vuoto
  // Se non ci sono elementi validi, ritorna null → il componente non renderizza nulla
  if (!validFavorites.length) return null;  // Se l'array è vuoto, non faccio apparire niente a schermo

  return (  
    // Contenitore principale del componente
    <div className="favorites">  
      {/* Titolo della sezione */}
      <h3>I tuoi preferiti</h3>

      {/* Griglia di card per i preferiti, usando solo quelli validi */}
      <div className="favorites-grid">  
        {/* Contenitore a griglia per le card
            Ciclo su tutti i preferiti validi
            Uso motion.div per animare l'apparizione della card
            Ogni elemento deve avere una key unica per React
            Abilita animazioni automatiche quando le card cambiano posizione
            Stato iniziale (initial): invisibile e spostata verso il basso
            Stato finale (animate): visibile e nella posizione corretta
            (exit) quando la card viene rimossa, diventa invisibile
        */}
        {validFavorites.map((favorite) => (  
          <motion.div
            key={favorite.id}
            layout
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
          >
            {/* Renderizzo la card passando i dati e la funzione onSelect */}
            <ResultCard item={favorite} onSelect={onSelect} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
