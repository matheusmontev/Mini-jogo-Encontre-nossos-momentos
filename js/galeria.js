// js/galeria.js

document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('galeria-list');

    if (!list) return;

    // Gerar cards dinamicamente
    MEMORIAS.forEach(memoria => {
        const article = document.createElement('article');
        article.className = 'memory-card';

        article.innerHTML = `
            <div class="memory-card-images">
                <div class="memory-card-img-wrapper">
                    <img src="${memoria.foto1}" alt="Memória ${memoria.id} - Parte 1">
                </div>
                <div class="memory-card-img-wrapper">
                    <img src="${memoria.foto2}" alt="Memória ${memoria.id} - Parte 2">
                </div>
            </div>
            <div class="memory-card-text">
                <p class="memory-card-title">${memoria.mensagem}</p>
                <p class="memory-card-date">${memoria.data}</p>
            </div>
        `;

        list.appendChild(article);
    });
});
