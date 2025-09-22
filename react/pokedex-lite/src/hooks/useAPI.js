// Hook generico per fare fetch su una URL e gestire data/loading/error
import { useEffect, useState } from "react";

export function useAPI(url) {
  // stato dei dati
  const [data, setData] = useState(null);
  // stato di caricamento
  const [loading, setLoading] = useState(true);
  // stato di errore (stringa o null)
  const [error, setError] = useState(null);

  useEffect(() => {
    // se non abbiamo una url, non fare nulla
    if (!url) return;

    // controller per poter abortire il fetch se il componente si smonta
    const ctrl = new AbortController();

    // Funzione asincrona auto-eseguita per poter usare await dentro useEffect
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // chiamata fetch con signal per l'abort
        const res = await fetch(url, { signal: ctrl.signal });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json(); // parse JSON
        setData(json);
      } catch (e) {
        // ignora l'AbortError
        if (e.name !== "AbortError") setError(e.message || "Errore di rete");
      } finally {
        setLoading(false);
      }
    })();

    // cleanup: abort se il componente si smonta o cambia url
    return () => ctrl.abort();
  }, [url]);

  // l'hook espone sempre lo stesso contratto
  return { data, loading, error };
}
