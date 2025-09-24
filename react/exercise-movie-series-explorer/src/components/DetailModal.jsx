// Importa motion dalla libreria framer-motion per creare animazioni
import { motion } from "framer-motion";

// Definisce un componente React chiamato DetailModal
// Riceve alcune proprietà (props) dal genitore:
// - detail: contiene i dettagli del film o serie da mostrare
// - onClose: funzione per chiudere la modale
// - onToggleFavorite: funzione per aggiungere o togliere dai preferiti
// - isFavorite: true se il film/serie è già tra i preferiti
export default function DetailModal({ detail, onClose, onToggleFavorite, isFavorite }) {

  // Controlla se non ci sono dettagli, in quel caso non mostra niente
  if (!detail) return null;

  // Ritorna il JSX che rappresenta la modale con animazioni
  return (
    <motion.div
      className="modal-overlay" // Overlay semi-trasparente dietro la modale
      initial={{ opacity: 0 }}  // All'inizio è invisibile
      animate={{ opacity: 1 }}  // Poi diventa visibile
      exit={{ opacity: 0 }}     // Quando chiude, torna invisibile
      onClick={onClose}         // Cliccando sull'overlay si chiude la modale
    >
      <motion.div
        className="modal-content"           // Contenitore interno della modale
        initial={{ scale: 0.8 }}            // Parte più piccolo
        animate={{ scale: 1 }}              // Scala normale
        exit={{ scale: 0.8 }}               // Ridotto quando chiude
        onClick={(e) => e.stopPropagation()} // Blocca la chiusura se clicco dentro la modale
      >
        <div className="modal-image">
          <img src={detail.poster} alt={detail.title} /> {/* Mostra l'immagine del film/serie */}
        </div>

        <div className="modal-info">
          <h2>{detail.title} ({detail.year})</h2> {/* Mostra titolo e anno */}
          <p dangerouslySetInnerHTML={{ __html: detail.summaryHTML }} /> {/* Mostra il sommario con eventuale HTML */}
          <p><strong>Generi:</strong> {detail.genres.join(", ")}</p> {/* Mostra i generi separati da virgola */}
          <p><strong>Lingua:</strong> {detail.language}</p> {/* Mostra la lingua */}
          <p><strong>Status:</strong> {detail.status}</p> {/* Mostra lo status (es. in corso, terminato) */}
          <p><strong>Runtime:</strong> {detail.runtime} min</p> {/* Mostra durata in minuti */}
          <button onClick={() => onToggleFavorite(detail)}> {/* Pulsante per aggiungere/rimuovere dai preferiti */}
            {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"} {/* Cambia testo in base allo stato */}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
