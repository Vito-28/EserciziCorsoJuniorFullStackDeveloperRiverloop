// Menu mobile
const navBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

navBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// Anno corrente
document.getElementById('year').textContent = new Date().getFullYear();