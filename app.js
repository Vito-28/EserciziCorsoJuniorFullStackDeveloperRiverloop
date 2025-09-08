// Menu mobile
const navBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

navBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// Chiudi menu quando si clicca su un link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

// Form validation e submit
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const messaggio = form.messaggio.value.trim();
    
    // Validazione campi obbligatori
    if (!nome || !email) {
        alert('Compila i campi obbligatori');
        return;
    }

    // Validazione nome
    const nomeRegex = /^[A-Za-z]+$/;
    if(!nomeRegex.test(nome)) {
        alert('Inserisci un nome valido');
        return;
    }
    
    // Validazione email semplice
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Inserisci un indirizzo email valido');
        return;
    }
    
    // Simulazione invio
    alert('Messaggio inviato');
    form.reset();
});

// Anno corrente
document.getElementById('year').textContent = new Date().getFullYear();
