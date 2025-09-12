// Dati del quiz
// Array di oggetti: ogni oggetto rappresenta una domanda
const quizData = [
    {
        //Testo della domanda
        question: "Qual è il risultato di 2 + '2' in JavaScript?",
        //Possibili risposte in ordine
        answers: ["4", "'22'", "NaN", "Errore"],
        //Indice della risposta corretta nell'array answers
        correct: 1
    },
    {
         //Testo della domanda
        question: "Quale keyword si usa per dichiarare una costante?",
        //Possibili risposte in ordine
        answers: ["var", "let", "const", "static"],
        //Indice della risposta corretta nell'array answers
        correct: 2

    },
{
     //Testo della domanda
        question: "Quale metodo serve per aggiungere un elemento ad un array?",
        //Possibili risposte in ordine
        answers: ["push()", "pop()", "shift()", "concat()"],
        //Indice della risposta corretta nell'array answers
        correct: 0
}, 
{   
     //Testo della domanda
        question: "Quale confronto è 'stretto' (tipo + valore)?",
        //Possibili risposte in ordine
        answers: ["==", "===", "!=", "!=="],
        //Indice della risposta corretta nell'array answers
        correct: 1
},
{
     //Testo della domanda
        question: "Quale parola chiave definisce una funzione freccia?",
        //Possibili risposte in ordine
        answers: ["arrow function", "=>", "function=>", "() arrow"],
        //Indice della risposta corretta nell'array answers
        correct: 1
}
];

// Stato del quiz a runtime

// Indice della domanda attuale (parte da 0)
let currentQuestion = 0;
//Punteggio accumulato dall'utente
let score = 0;
// streak consecutivo corrette per il bonus
let streak = 0;

//Variabili per il timer
let timer = null;  // riferimento all'intervallo
const TIMER_SECONDS = 15; // secondi massimi per ogni domanda
let timeLeft = TIMER_SECONDS; // tempo rimanente

// Collegamenti al DOM

//<div> dove mostreremo il testo della domanda
const questionEl = document.getElementById("question-container");
//<ul> che conterrà i pulsanti delle risposte
const answersEl = document.getElementById("answers");
//<p> dove mostreremo feedback (corretto/sbagliato) e punteggio finale
const scoreEl = document.getElementById("score");

//Pulsante Prossima (inizialmente nascosto in HTML)
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");

const resultsBox = document.getElementById("results");
const finalScoreEl = document.getElementById("final-score");
const highScoreEl = document.getElementById("high-score");
const restartBtn = document.getElementById("restart-btn");
const clearStorageBtn = document.getElementById("clear-storage-btn");

// elementi per mostrare timer sullo schermo
const timerContainer = document.getElementById("timer-container");
const timerDisplay = document.getElementById("timer-display");

// Funzioni di utilità

// Aggiorna la UI dell'avanzamento (Domanda X/Y + barra grafica)
function updateProgress() {
    const total = quizData.length;
    const humanIndex = currentQuestion +1;
    progressText.textContent = `Domanda ${humanIndex}/${total}`;

// Calcolo percentuale
const pct = (currentQuestion / total) * 100;
progressBar.style.width = `${pct}%`; 
}

function disableAnswerButtons() {
    const buttons = answersEl.querySelectorAll("button");
    buttons.forEach(b => b.disabled = true);
}

//Salva i risultati in localstorage
function saveResultsToLocalStorage(finalScore) {
    const last = { score: finalScore, date: new Date().toISOString() };
    localStorage.setItem("quiz:lastScore", JSON.stringify(last));

    // Salvataggio storico tentativi: aggiungo il punteggio all'array history
    const history = JSON.parse(localStorage.getItem("quiz:history") || "[]");
    history.push(last);
    localStorage.setItem("quiz:history", JSON.stringify(history));

    //Gestione record
    const prevHigh = Number(localStorage.getItem("quiz:highScore") || 0);
    if (finalScore > prevHigh) {
        localStorage.setItem("quiz:highScore", String(finalScore));
    }
}

//Legge high score da local storage
function getHighScore() {
    return Number(localStorage.getItem("quiz:highScore") || 0)
}

// Funzione per avviare il timer
function startTimer() {
    clearInterval(timer);
    timeLeft = TIMER_SECONDS;
    timerDisplay.textContent = timeLeft;
    timerContainer.style.display = "block";
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            streak = 0;
            scoreEl.textContent = "⏰ Tempo scaduto!";
            scoreEl.className = "wrong";
            disableAnswerButtons();
            nextBtn.style.display = "block";
        }
    }, 1000);
}

// Funzione per fermare il timer manualmente
function stopTimer() {
    clearInterval(timer);
}

//Funzione: carica/mostra una domanda

function loadQuestion() {
    //svuota la lista delle risposte da ventuali domande precedenti
    answersEl.innerHTML = "";
    //svuola il feedback sotto 
    scoreEl.textContent = "";
    scoreEl.className = "";      // rimuove classi correct e wrong
    nextBtn.style.display = "none";

    // Aggiorna avanzamento (testo + barra)
    updateProgress();

    //Ricava l'oggetto domanda corrente partendo dall'indice
    const q = quizData[currentQuestion];

    //Mostra il testo della domanda nel relatico contenitore
    questionEl.textContent = q.question;

    //Per ogni rispsota disponibile...
    q.answers.forEach((answer, index) => {
        // Crea un <li> per mantenere pulita la lista
        const li = document.createElement("li");
        //Crea un pulsante per la rispsota
        const btn = document.createElement("button");
        // Testo del pulsante = testo della rispsota
        btn.textContent = answer;

        btn.onclick = ()  => checkAnswer(index);

        //Insercisce il pulsante nel <li>
        li.appendChild(btn);
        answersEl.appendChild(li);
    });

    startTimer();   // avvio timer per questa domanda

}

// Funzione: verifica la risposta

function checkAnswer(index) {
    stopTimer();    // fermo timer appena l'utente risponde

    //Recuperiamo la domanda corrente
    const q = quizData[currentQuestion];

    // Se l'indicecoincide con quello corretto allora incrementa il punteggio
    if (index === q.correct) {
        //Aggiorna streak e calcola bonus
        streak +=1;
        const bonus = Math.max(0, streak - 1);
        const gained = 1 + bonus;

       //Aggiorna punteggio
        score += gained;

        // Mostra messaggio di rispsota corretta
        scoreEl.textContent = bonus > 0 ? `OK Risposta corretta! +${gained} ( 1 base + ${bonus} bonus streak)`: `Risposta corretta! + 1`;
        scoreEl.className = "coorect";
    } else {
        streak = 0;   // risposta sbagliata
        scoreEl.textContent = "X Rispsota sbagliata";
        scoreEl.className = "wrong";
    }

    //Disabilita i bottoni per evitare doppio click
    disableAnswerButtons();

    //Rendi visibile il pulsante Prossima 
    nextBtn.style.display = "block";
}

// Avanzamento / fine quiz

// Gestione del pulsante prossima 
nextBtn.addEventListener("click", () => {
    stopTimer();    // fermo timer quando passo alla prossima domanda
    currentQuestion++;

    //Aggiorna barar di avanzamento 
    updateProgress();

    // Se ci sono ancora domande...
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        //Se non ci sono più domande mostra la schermata finale
        const total = quizData.length;
        finalScoreEl.textContent = `Punteggio finale: ${score} su ${total} (con bonus)`;

        const high = getHighScore();
        saveResultsToLocalStorage(score);
        const newHigh = getHighScore();

       highScoreEl.textContent = newHigh > high ? `Nuovo record! High score: ${newHigh}` : `Record personale: ${newHigh}`;

       //Nascondi elementi del quiz e mostra sezione risultati
       questionEl.textContent = "Quiz completato!";
       answersEl.innerHTML = "";
       scoreEl.textContent = "";
       nextBtn.style.display = "none";
       resultsBox.style.display = "block";

       progressBar.style.width = "100%";
       progressText.textContent = `Domanda ${total}/${total}`;
       timerContainer.style.display = "none";  // nascondo timer alla fine
    }
});


//Ricomincia il quiz da zero
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    streak = 0;
    resultsBox.style.display = "none";
    loadQuestion();
});

//Cancella record e ultimo punteggio dal localStorage
clearStorageBtn.addEventListener("click", () => {
    localStorage.removeItem("quiz:highScore");
    localStorage.removeItem("quiz:lastScore");
    localStorage.removeItem("quiz:history");    // pulisco anche storico tentativi
    highScoreEl.textContent = "Record azzerato.";
});

// Avvio dell'app: carica la prima domanda

loadQuestion();