// Importiamo due hook fondamentali di React:
// - useState: crea e gestisce stato locale (dati che cambiano nel tempo)
// - useMemo: memorizza un valore calcolato per evitare ricalcoli inutili a ogni render
import { useState, useMemo } from "react";

// Importiamo il componente Titolo (mostra un <h1> con className="title")
import Titolo from "./components/Titolo.jsx";

// Importiamo l'array statico di progetti da un file esterno
import projects from "./data/projects.js";

// Definiamo il componente principale dell’app React.
// Questo sarà montato in main.jsx dentro il <div id="root">.
export default function App() {
  // Stato "query": contiene il testo digitato dall’utente nel campo di ricerca.
  // "setQuery" è la funzione che aggiorna questo stato.
  const [query, setQuery] = useState("");

  // "filtered": lista di progetti filtrata in base a "query".
  // useMemo evita di ricalcolare il filtro se "query" non è cambiata.
  const filtered = useMemo(() => {
    // "q" = query normalizzata (trim degli spazi e minuscolo)
    const q = query.trim().toLowerCase();

    // Se la query è vuota ⇒ restituisci tutti i progetti
    if (!q) return projects;

    // Altrimenti: restituisci i progetti il cui titolo O descrizione
    // contengono la sottostringa cercata (includes)
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]); // Dipendenze: ricalcola solo quando cambia "query"

  // Prepariamo il testo del contatore (singolare/plurale) e lo stile condizionale
  const count = filtered.length; // quanti progetti corrispondono
  const parola = count === 1 ? "progetto" : "progetti"; // singolare/plurale
  const verbo = count === 1 ? "trovato" : "trovati";    // concordanza del participio
  const counterText = `${count} ${parola} ${verbo}`;

  // Stile condizionale del contatore:
  // 0 → rosso (error), 1 → neutro (muted), >1 → verde (success)
  let counterClass = "muted";
  if (count === 0) counterClass = "error";
  if (count > 1) counterClass = "success";

  // Il return contiene il JSX, cioè la UI che React renderizza
  return (
    // Contenitore principale
    <main className="container">
      {/* HEADER con titolo e sottotitolo */}
      <header className="header">
        {/* Uso del componente Titolo */}
        <Titolo testo="React Base" />

        {/* Sottotitolo con testo attenuato */}
        <p className="muted">Lista semplice + ricerca.</p>
      </header>

      {/* SEZIONE RICERCA */}
      <section className="card">
        <label className="search">
          Cerca:
          <input
            type="search"
            placeholder="Es. landing, todo..."
            value={query || ""}                 // Input controllato: il valore proviene dallo stato "query"
            onChange={(e) => setQuery(e.target.value)} // Aggiorna "query" a ogni digitazione
            aria-label="Cerca progetti"         // Accessibilità: etichetta per screen reader
          />
        </label>
      </section>

      {/* SEZIONE LISTA PROGETTI */}
      <section>
        <h2>Progetti</h2>

        {/* Contatore dinamico con stile condizionale */}
        <p className={counterClass}>{counterText}</p>

        {filtered.length === 0 ? (
          // Nessun risultato
          <p className="muted">Nessun progetto trovato.</p>
        ) : (
          // Lista dei risultati
          <ul className="cards">
            {filtered.map((p) => (
              <li key={p.id} className="card">
                <h3>{p.title}</h3>
                <p className="muted">{p.description}</p>
                <ul className="tags">
                  {/* Mappiamo i tag del progetto */}
                  {p.tags.map((t) => (
                    <li key={t} className="tag">
                      #{t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* FOOTER con anno corrente calcolato da JS */}
      <footer className="footer">
        © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
