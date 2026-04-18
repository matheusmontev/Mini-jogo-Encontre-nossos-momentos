// js/vitoria.js

document.addEventListener('DOMContentLoaded', () => {
    const tempoEl = document.getElementById('vitoria-tempo');
    const movimentosEl = document.getElementById('vitoria-movimentos');

    const tentativas = sessionStorage.getItem('velvet_memory_tentativas');
    const tempo = sessionStorage.getItem('velvet_memory_tempo');

    if (movimentosEl) {
        movimentosEl.textContent = tentativas || '--';
    }

    if (tempoEl) {
        tempoEl.textContent = tempo || '--';
    }
});
