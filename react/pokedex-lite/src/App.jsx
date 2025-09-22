import { useMemo, useState } from 'react';
import { useAPI } from './hooks/useAPI';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import Pagination from './components/Pagination';

// quante card per pagina lato API
const PAGE_SIZE = 20;

export default function App() {
  // pagina corrente
  const [page, setPage] = useState(1);
  // testo di ricerca
  const [search, setSearch] = useState("");
  // nome del Pokémon selezionato per mostrare i dettagli
  const [selected, setSelected] = useState(null);

  // calcolo l'offset per l'endpoint in base alla pagina
  const offset = (page - 1) * PAGE_SIZE;

  // chiamata alla lista (count + results) tramite useAPI
  const { data, loading, error } = useAPI(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );

  // calcolo quante pagine totali ho
  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 1;

  // filtro sui risultati della pagina corrente
  const filtered = useMemo(() => {
    if (!data?.results) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data.results;
    return data.results.filter((p) => p.name.includes(q));
  }, [data, search]);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Pokédex Lite</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Cerca per nome"
      />

      {loading && <p>Caricamento...</p>}
      {error && <p>Errore: {error}</p>}

      {!loading && !error && (
        <>
          <PokemonList items={filtered} onSelect={setSelected} />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      {selected && (
        <PokemonDetail name={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
