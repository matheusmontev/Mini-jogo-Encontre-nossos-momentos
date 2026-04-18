// js/home.js

document.addEventListener('DOMContentLoaded', () => {
    // Limpar dados de partida anterior ao chegar na home
    sessionStorage.removeItem('velvet_memory_tentativas');
    sessionStorage.removeItem('velvet_memory_tempo');
});
