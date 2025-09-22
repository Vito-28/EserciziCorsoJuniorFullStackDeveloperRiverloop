import { useEffect, useMemo, useState } from "react";

import { articles as data } from "./data/articles";

import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

const PAGE_SIZE = 3;  // 3 articoli per pagina

export default function App() {
  // Stato per la categoria selezionata nel filtro
  const [selectedCategory, setSelectedCategory] = useState("Tutte");

  // Stato ricerca testuale
  const [search, setSearch] = useState("");

  // Stato per l'articolo attualmente selezionato
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Pagina corrente (reset quando cambiano i filtri / ricerca)
  const [page, setPage] = useState(1);

  // Preferiti (array di ID) con persistenza locale
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  // Persiste i preferiti ad ogni cambio
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Ogni volta che cambio filtro o ricerca → resetto pagina a 1 e nascondo i dettagli
  useEffect(() => {
    setPage(1);
    setSelectedArticle(null);
  }, [selectedCategory, search]);

  // Filtro per categoria
  const byCategory = useMemo(() => {
    return selectedCategory === "Tutte"
      ? data
      : data.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  // Ricerca testuale su titolo e contenuto
  const bySearch = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return byCategory;

    return byCategory.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
    );
  }, [byCategory, search]); // ✅ corretto

  // Ordinamento per data (più recenti in alto)
  const sorted = useMemo(() => {
    return [...bySearch].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [bySearch]);

  // Paginazione
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));  // calcolo quante pagine totali
  const pageSafe = Math.min(page, totalPages);            // evita uscita dal range
  const paged = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE); // mostra solo gli articoli della pagina corrente
  }, [sorted, pageSafe]);

  // Aggiungi o rimuovi un articolo dai preferiti
  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <main style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
      <h1>News</h1>

      <CategoryFilter
        categories={["Tutte", "Storia", "Curiosità", "Eventi"]}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <SearchBar value={search} onChange={setSearch} />

      {selectedArticle ? (
        <ArticleDetail
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
          isFav={favorites.includes(selectedArticle.id)}
          onToggleFav={toggleFavorite}
        />
      ) : (
        <>
          <ArticleList
            articles={paged}
            onSelect={setSelectedArticle}
            selectedArticle={selectedArticle}
            favorites={favorites}
            onToggleFav={toggleFavorite}
          />
          <Pagination
            page={pageSafe}
            totalPages={totalPages}
            onChange={setPage}
          />
        </>
      )}
    </main>
  );
}

