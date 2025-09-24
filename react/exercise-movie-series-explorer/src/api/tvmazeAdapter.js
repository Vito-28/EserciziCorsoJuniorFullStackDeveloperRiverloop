// Adapter per TVMaze Api (https://www.tvmaze.com/api)
// Il file funziona da "adapter" tra la UI/logica e l'API pubblica di TVMaze
// incapsulando chiamate HTTP e la normalizzazione dei dati.

// Dichiara la costante che contiene l'URL base dell'API TVMaze.
// const indica che la variabile non può essere riassegnata (immutabilità).
// usare una costante per l'URL centrale facilita la manutenzione e previene errori di digitazione.
const API_URL = "https://api.tvmaze.com";

// ■ Ricerca show per titolo (no key richiesta)
// Definisce e esporta una funzione asincrona searchTitles che esegue una ricerca per titolo su TVMaze. 
// query è la stringa di ricerca dell'utente; 
// page è il numero di pagina client-side, di default pari a 1.
// 

export async function searchTitles(query, page = 1) {
    if (!query?.trim()) {
        return { items: [], totalResults: 0, totalPages: 0 };
    }

    const res = await fetch(`${API_URL}/search/shows?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Errore nella chiamata di ricerca");
    
    const data = await res.json();
    const normalized = data.map(d => normalizeSearchItem(d.show));
    
    const pageSize = 10;
    const totalResults = normalized.length;
    
    // ✅ FIX: Calcola totalPages senza Math.max forzato
    // Se non ci sono risultati, totalPages = 0
    // Altrimenti calcola normalmente
    const totalPages = totalResults === 0 ? 0 : Math.ceil(totalResults / pageSize);
    
    const start = (page - 1) * pageSize;
    const items = normalized.slice(start, start + pageSize);

    return { items, totalResults, totalPages };
}

// ■ Dettaglio show per ID
// Definisce ed esporta una funzione asincrona che recupera i dettagli completi di uno show dato il suo ID.
export async function getTitleById(id) {

    // Costruiamo l'URL di richiesta per l'endpoint /shows/:id usando template literal.
    // Se id non è un valore valido (es. undefined), l'URL sarà invalido e la fetch fallirà.
    const res = await fetch(`${API_URL}/shows/${id}`);

    // Verifichiamo lo stato della risposta HTTP.
    // Se l'endpoint risponde con errore, lanciamo un'eccezione.
    if (!res.ok) throw new Error("Errore nel caricamento del dettaglio");

    // Parsiamo il JSON della risposta e lo memorizziamo in raw.
    // raw è l'oggetto completo restituito da TVMaze per quel singolo show.
    const raw = await res.json();

    // L'oggetto raw contiene tutti i dati grezzi restituiti dall'API di TVMaze.
    // La funzione normalizeDetailItem prende questi dati e li trasforma in un oggetto più semplice,
    // con solo le proprietà utili e già pronte da usare nei componenti React
    // (ad esempio titolo, anno, generi, trama, poster...).
    // Infine ritorniamo questo oggetto al codice che ha chiamato la funzione getTitleById.
    return normalizeDetailItem(raw);
}

// ■ Normalizzazioni (UI-friendly)
// Funzione che mappa la struttura dell'oggetto show proveniente dall'API in un oggetto più semplice
// e coerente per l'utilizzo nella UI (lista / card).
function normalizeSearchItem(show) {

    // Ritorniamo un oggetto con proprietà selezionate e formattate.
    return {
        // Id numerico univoco dello show fornito dall'API.
        id: show.id,

        // Nome dello show.
        title: show.name,

        // Estratto dell'anno di premiere:
        // Se show.premiered esiste (es. "2013-06-24") prendiamo i primi 4 caratteri con slice(0,4) per ottenere "2013".
        // Se premiered è assente o falsy, forniamo un fallback (qui "—" come segnaposto leggibile).
        year: show.premiered ? show.premiered.slice(0, 4) : "—",

        // Tipo di show.
        // Se show.type è falsy, usiamo series come valore predefinito.
        type: show.type || "series",

        // URL dell'immagine da usare nelle card:
        // show.image può essere undefined; per evitare errori usiamo optional chaining (?.).
        // Preferiamo medium per le liste (dimensione più piccola); se non esiste proviamo originalxw.
        // Se nessuna immagine è disponibile, restituiamo null e la UI potrà mostrare un placeholder.
        poster: show.image?.medium || show.image?.original || null,

        // Valutazione media:
        // show.rating?.average può essere undefined o null; usiamo l'operatore nullish coalescing (??)
        // per distinguere tra valori 0 e undefined/null; qui, se è undefined/null ritorniamo null.
        rating: show.rating?.average ?? null,

        genres: show.genres || [], // filtro genere
    };
}

// Funzione che normalizza l'oggetto show per la vista di dettaglio,
// includendo più campi (summary in HTML, generi, link ufficiale, ecc.).
function normalizeDetailItem(show) {

    // Ritorniamo un oggetto contenente campi utili per la UI di dettaglio.
    // Ogni proprietà è spiegata in dettaglio tramite commenti sotto.
    return {

        // Id dello show (utile per operazioni come "aggiungi ai preferiti").
        id: show.id,

        // Titolo completo.
        title: show.name,

        // Anno di premiere (primi 4 caratteri della data completa) o fallback "—".
        year: show.premiered ? show.premiered.slice(0, 4) : "—",

        // Array di generi (es. ["Drama", "Science-Fiction"]); se non presente => array vuoto.
        genres: show.genres || [],

        // Sommario / trama in HTML così com'è fornita da TVMaze:
        // show.summary spesso contiene markup HTML (es. <p>...</p>), quindi viene
        // mantenuto come stringa HTML e la UI deciderà come inserirlo (es. dangerouslySetInnerHTML).
        // Se assente, forniamo stringa vuota per evitare null/undefined in rendering.
        summaryHTML: show.summary || "",

        // Poster per la vista dettaglio: preferiamo original (maggiore risoluzione),
        // se non disponibile usiamo medium; altrimenti null come fallback.
        poster: show.image?.original || show.image?.medium || null,

        // Rating medio (null se non disponibile).
        rating: show.rating?.average ?? null,

        // Stato della serie (es. "Running", "Ended").
        status: show.status,

        // Lingua originale (es. "English").
        language: show.language,

        // Durata in minuti (runtime).
        runtime: show.runtime,

        // Data completa di premiere (es. "2013-06-24") — utile per formattazioni avanzate.
        premiered: show.premiered,

        // Link al sito ufficiale:
        // show.officialSite è preferito; se non esiste usiamo show.url (pagina TVMaze dello show).
        officialSite: show.officialSite || show.url,
    };
}
