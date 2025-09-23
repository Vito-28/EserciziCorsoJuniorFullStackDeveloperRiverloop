// Importiamo i due hook principali di React: 
// useState per gestire lo stato locale
// useEffect per gestire effetti collaterali legati al ciclo di vita del componente
import { useState, useEffect } from "react";

// Definiamo il custom hook useLocalStorage che accetta due parametri:
// key -> la chiave sotto cui salvare i dati in localStorage
// initialValue -> valore iniziale da usare se non esiste nulla in localStorage
export function useLocalStorage(key, initialValue) {

  // useState con funzione iniziale per leggere il valore salvato in localStorage
  // Usando la forma con funzione, viene eseguita solo al primo render, evitando letture inutili successive
  const [storedValue, setStoredValue] = useState(() => {

    try {
      // Proviamo a leggere l'elemento dal localStorage tramite la chiave specificata
      const item = window.localStorage.getItem(key);
      
      // Se esiste, viene parsato da JSON (localStorage salva solo stringhe)
      // Se non esiste, utilizziamo il valore iniziale passato come fallback
      return item ? JSON.parse(item) : initialValue;

    } catch {

      // In caso di errore (es. dati corrotti o JSON non valido), ritorniamo comunque il valore iniziale
      return initialValue;

    }
  });

  // useEffect per sincronizzare lo stato locale con localStorage
  // Ogni volta che cambia storedValue o la key, questo effetto viene rieseguito
  useEffect(() => {

    // Salviamo lo stato corrente in localStorage come stringa JSON
    // Così rimane persistente anche dopo il refresh della pagina
    localStorage.setItem(key, JSON.stringify(storedValue));
    
  }, [key, storedValue]); // array di dipendenze: l'effetto si attiva solo se cambia key o storedValue

  // Ritorniamo un array simile a useState: 
  // storedValue -> il valore corrente
  // setStoredValue -> funzione per aggiornarlo (aggiorna anche localStorage automaticamente)
  return [storedValue, setStoredValue];
}
