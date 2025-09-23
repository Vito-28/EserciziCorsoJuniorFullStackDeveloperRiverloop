// Importiamo i due hook principali di React: 
// useState per gestire lo stato locale
// useEffect per gestire effetti collaterali legati al ciclo di vita del componente
import { useState, useEffect } from "react";

// Creiamo un custom hook chiamato useDebounce che prende in input:
// - value: il valore dicui vogliamo ritardare l’aggiornamento del valore
// - delay: il tempo in millisecondi da attendere prima di aggiornare il valore debounced
export function useDebounce(value, delay = 500) {
  
  // Stato interno debounced che contiene il valore effettivamente aggiornato dopo il debounce.
  // Lo inizializziamo con il valore iniziale passato come parametro.
  const [debounced, setDebounced] = useState(value);

  // useEffect viene eseguito ogni volta che cambiano value o delay.
  // Serve per impostare un timer che aggiorna lo stato debounced solo dopo un certo ritardo.
  useEffect(() => {
    
    // Creiamo un timeout che, dopo delay in millisecondi, aggiorna debounced con l'ultimo valore di value.
    const handler = setTimeout(() => setDebounced(value), delay);

    // La funzione di cleanup del useEffect:
    // Viene eseguita prima che l'effetto venga rieseguito o quando il componente viene smontato.
    // Serve per cancellare il timeout precedente e evitare aggiornamenti obsoleti.
    return () => clearTimeout(handler);
    
    // L'array di dipendenze indica a React di rieseguire l'effetto solo quando value o delay cambiano.
  }, [value, delay]);

  // Restituiamo il valore debounced. 
  // I componenti che usano questo hook riceveranno un valore aggiornato solo dopo il ritardo.
  return debounced;
}
