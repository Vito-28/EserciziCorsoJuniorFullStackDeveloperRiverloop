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
export async function searchTitles(query, page = 1) {

    // Gestione query vuota:
    // query?.trim() usa optional chaining per evitare errori se query è undefined/null.
    // trim() rimuove spazi bianchi iniziali/finali.
    // !query?.trim() è true se query è undefined, null, o una stringa vuota dopo aver tolto spazi.
    if (!query?.trim()) {

        // Se la query è vuota o composta solo da spazi, ritorniamo subito
        // un oggetto che rappresenta risultati vuoti invece di chiamare l'API.
        // Questo evita chiamate inutili.
        return { items: [], totalResults: 0, totalPages: 0 };
    }

    // Chiamata API:
    // buildiamo l'URL di ricerca con template literal e encodeURIComponent per
    // codificare correttamente caratteri speciali nella query (es. spazi, &, ? ecc).

    // fetch() restituisce una Promise che risolve con un Response;
    // usiamo await per attendere il completamento della richiesta in modo sincrono-leggibile.
    const res = await fetch(`${API_URL}/search/shows?q=${encodeURIComponent(query)}`);

    // Gestione errori HTTP:
    // Se la risposta non è ok, lanciamo un'eccezione per delegare la gestione
    // dell'errore al chiamante.
    if (!res.ok) throw new Error("Errore nella chiamata di ricerca");

    // Otteniamo il body della risposta in formato JSON.
    // res.json() ritorna una Promise che risolve con il parsing dell'JSON.
    // La struttura restituita da TVMaze per /search/shows è un array di oggetti { score, show }.
    const data = await res.json(); // [{ score, show }, ...]

    // TVMaze non ha paginazione nativa su /search e gestiamo client-side.
    // per uniformare i risultati alla UI trasformiamo ogni elemento
    // con la funzione normalizeSearchItem, passando la proprietà show che contiene i dati reali.
    const normalized = data.map(d => normalizeSearchItem(d.show));

    // Paginiamo client-side: definiamo la dimensione di pagina (numero di item per pagina).
    // Scegliendo un valore fisso (10) abbiamo un controllo semplice su quanti risultati mostrare.
    const pageSize = 10;

    // Numero totale di risultati (dopo normalizzazione).
    // utile per mostrare X risultati nella UI e per calcolare il numero di pagine.
    const totalResults = normalized.length;

    // Calcolo del numero totale di pagine.
    // Math.ceil(totalResults / pageSize) arrotonda verso l'alto, es. 15 risultati, pageSize 10 => 2 pagine.
    // Math.max(1, ...) assicura che venga restituito almeno 1 come numero di pagine anche se totalResults è 0.
    // questo design fa sì che, in assenza di risultati, totalPages sia 1;
    const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

    // Indice di partenza per l'array slice in base alla pagina richiesta.
    // (page - 1) perché qui le pagine sono 1-based (page = 1 => start = 0).
    // se page è minore di 1, start può diventare negativo: è buona pratica validare page prima di usarlo.
    const start = (page - 1) * pageSize;

    // Otteniamo gli elementi della pagina corrente usando slice.
    // slice(start, end) ritorna gli elementi dall'indice start incluso fino a end escluso.
    // se start è oltre la lunghezza, slice restituisce [].
    const items = normalized.slice(start, start + pageSize);

    // Ritorniamo un oggetto che contiene:
    // items: array degli elementi per la pagina richiesta
    // totalResults: numero complessivo di risultati disponibili
    // totalPages: numero totale di pagine calcolato client-side
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
