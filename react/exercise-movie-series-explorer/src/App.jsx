// src/App.jsx
// Importazione degli hook di React per gestire stato e ciclo di vita
import { useState, useEffect } from "react";
// Importazione delle animazioni da framer-motion
import { AnimatePresence, motion } from "framer-motion";

// Importazione dei componenti personalizzati dell'app
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import DetailModal from "./components/DetailModal";
import Favorites from "./components/Favorites";
import GenreFilter from "./components/GenreFilter";
import Pagination from "./components/Pagination";

// Importazione di hook personalizzati
import { useDebounce } from "./hooks/useDebounce"; // Gestisce ritardi nelle ricerche (debounce)
import { useLocalStorage } from "./hooks/useLocalStorage"; // Salva dati in localStorage

// Importazione delle funzioni per chiamare l'API TVMaze
import { searchTitles, getTitleById } from "./api/tvmazeAdapter";

export default function App() {
  // Stato per il testo della ricerca digitata dall'utente
  const [query, setQuery] = useState("");
  // Applichiamo il debounce per ridurre le chiamate API (500ms di ritardo)
  const debouncedQuery = useDebounce(query, 500);

  // Stato per i risultati della ricerca
  const [results, setResults] = useState([]);
  // Stato di caricamento per mostrare feedback all'utente
  const [loading, setLoading] = useState(false);
  // Stato per eventuali errori
  const [error, setError] = useState(null);

  // Stato per il dettaglio selezionato (quando l'utente clicca su un titolo)
  const [selected, setSelected] = useState(null);
  // Stato per i preferiti salvati in localStorage (chiave "favorites")
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  // Stato per il filtro dei generi
  const [genreFilter, setGenreFilter] = useState("All");
  // Stato per la paginazione
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Stato per dark mode, salvato in localStorage
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  // Effetto che esegue la ricerca ogni volta che cambia la query o la pagina
  useEffect(() => {
    if (!debouncedQuery) { // Se non c'è testo nella ricerca
      setResults([]);
      setTotalPages(0); //da 1 a 0 quando non c'è query
      setPage(1); //reset della pagina corrente
      return;
    }

    setLoading(true); // Mostra "Caricamento..."
    setError(null); // Reset eventuali errori precedenti

    // Chiamata API per cercare titoli
    searchTitles(debouncedQuery, page)
      .then((res) => {
        console.log('Debug paginazione:', { //debug temporaneo
          query: debouncedQuery,
          totalItems: res.items.length,
          totalResults: res.totalResults,
          totalPages: res.totalPages,
          currentPage: page
        });

        setResults(res.items); // Aggiorna i risultati
        setTotalPages(res.totalPages); // Aggiorna numero di pagine totali
      })
      .catch((err) => setError(err.message)) // Gestione errori
      .finally(() => setLoading(false)); // Fine caricamento
  }, [debouncedQuery, page]);

  // Effetto separato per resettare la pagina quando cambia la query
  useEffect(() => {
    if (debouncedQuery) {
      setPage(1); // Torna sempre alla pagina 1 quando cambia la ricerca
    }
  }, [debouncedQuery]);

  // Applica filtro per genere (selezionato dall'utente)
  const filteredResults =
    genreFilter === "All"
      ? results
      : results.filter((r) => r.genres?.includes(genreFilter));

  // Funzione che gestisce il click su un risultato → carica i dettagli
  async function handleSelect(id) {
    try {
      const detail = await getTitleById(id); // API per dettaglio titolo
      setSelected(detail); // Salva dettaglio nello stato
    } catch (e) {
      setError(e.message); // Gestione errori
    }
  }

  // Funzione che aggiunge/rimuove un titolo dai preferiti
  function handleToggleFavorite(item) {
    const exists = favorites.some((f) => f.id === item.id);
    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  }

  useEffect(() => {
    // Applica la classe dark al body quando darkMode cambia
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Cleanup quando il componente si smonta
    return () => {
      document.body.classList.remove('dark');
    };
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {/* Header con titolo e bottone per dark/light mode */}
      <header>
        <h1>🎥 Movie/Series Explorer</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Barra di ricerca */}
      <SearchBar onSearch={setQuery} />
      {/* Filtro per genere */}
      <GenreFilter results={results} value={genreFilter} onChange={setGenreFilter} />

      {/* Stato caricamento o errore */}
      {loading && <p>Caricamento...</p>}
      {error && <p className="error">{error}</p>}

      {/* Lista dei risultati filtrati */}
      <ResultsList results={filteredResults} onSelect={handleSelect} />

      {/* Paginazione se ci sono più pagine */}
      {debouncedQuery && totalPages > 0 && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}

      {/* Sezione dei preferiti */}
      <Favorites favorites={favorites} onSelect={handleSelect} />

      {/* Modal per i dettagli con animazioni */}
      <AnimatePresence>
        {selected && (
          <DetailModal
            detail={selected}
            onClose={() => setSelected(null)}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.some((f) => f.id === selected?.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
