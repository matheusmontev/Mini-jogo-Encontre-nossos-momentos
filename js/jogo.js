// js/jogo.js

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('game-grid');
    const contadorTentativas = document.getElementById('contador-tentativas');
    const contadorTempo = document.getElementById('contador-tempo');
    const restartBtn = document.querySelector('.game-restart-btn');
    
    let cartasViradas = [];
    let paresEncontrados = 0;
    let tentativas = 0;
    let timerIniciado = false;
    let segundos = 0;
    let timerInterval;

    function formatarTempo(s) {
        const min = Math.floor(s / 60).toString().padStart(2, '0');
        const seg = (s % 60).toString().padStart(2, '0');
        return `${min}:${seg}`;
    }

    function iniciarTimer() {
        if (!timerIniciado) {
            timerIniciado = true;
            timerInterval = setInterval(() => {
                segundos++;
                contadorTempo.textContent = formatarTempo(segundos);
            }, 1000);
        }
    }

    function embaralhar(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function criarPopup(memoria) {
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 z-50 flex items-center justify-center p-md backdrop-blur-md';
        popup.style.backgroundColor = 'rgba(0,0,0,0.5)';
        
        popup.innerHTML = `
            <div class="bg-surface-container-lowest p-md rounded-xl shadow-xl max-w-sm w-full relative flex flex-col gap-sm" style="max-width: 320px;">
                <button class="absolute -top-3 -right-3 bg-primary text-white p-xs rounded-full shadow-lg flex items-center justify-center w-8 h-8" id="close-popup" style="border: none; cursor: pointer;">
                    <span class="material-symbols-outlined" style="font-size: 20px;">close</span>
                </button>
                <div class="grid grid-cols-2 gap-sm">
                    <img src="${memoria.foto1}" class="w-full aspect-square object-cover rounded-lg border border-outline/10">
                    <img src="${memoria.foto2}" class="w-full aspect-square object-cover rounded-lg border border-outline/10">
                </div>
                <div class="text-center mt-sm">
                    <p class="text-primary italic font-semibold text-lg leading-tight" style="color: var(--primary);">${memoria.mensagem}</p>
                    <p class="text-on-surface-variant text-sm mt-xs" style="color: var(--on-surface-variant); opacity: 0.7;">${memoria.data}</p>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        const fechar = () => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        };

        popup.addEventListener('click', (e) => {
            if (e.target === popup) fechar();
        });
        popup.querySelector('#close-popup').addEventListener('click', fechar);
    }

    function finalizarJogo() {
        clearInterval(timerInterval);
        sessionStorage.setItem('velvet_memory_tentativas', tentativas);
        sessionStorage.setItem('velvet_memory_tempo', formatarTempo(segundos));
        
        // Mensagem final
        const msgTexto = document.querySelector('.game-message-text');
        if (msgTexto) msgTexto.textContent = "Todas as memórias foram encontradas! ❤️";

        setTimeout(() => {
            window.location.href = 'vitoria.html';
        }, 1500);
    }

    function virarCarta(e) {
        const carta = e.currentTarget;

        if (
            cartasViradas.length === 2 || 
            carta.classList.contains('card-flipped') || 
            carta.classList.contains('card-matched')
        ) return;

        iniciarTimer();
        carta.classList.add('card-flipped');
        cartasViradas.push(carta);

        if (cartasViradas.length === 2) {
            tentativas++;
            contadorTentativas.textContent = tentativas;

            const [c1, c2] = cartasViradas;
            const id1 = c1.dataset.id;
            const id2 = c2.dataset.id;

            if (id1 === id2) {
                // Par correto
                c1.classList.add('card-matched');
                c2.classList.add('card-matched');
                paresEncontrados++;

                const memoria = MEMORIAS.find(m => m.id == id1);
                setTimeout(() => criarPopup(memoria), 500);

                cartasViradas = [];

                if (paresEncontrados === MEMORIAS.length) {
                    finalizarJogo();
                }
            } else {
                // Par errado
                setTimeout(() => {
                    c1.classList.remove('card-flipped');
                    c2.classList.remove('card-flipped');
                    cartasViradas = [];
                }, 1000);
            }
        }
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('velvet_memory_tentativas');
            sessionStorage.removeItem('velvet_memory_tempo');
            window.location.reload();
        });
    }

    function init() {
        if (!grid) return;
        
        // Limpar grid antes de preencher
        grid.innerHTML = '';

        // Criar as cartas
        let deck = [];
        MEMORIAS.forEach(memoria => {
            deck.push({ id: memoria.id, foto: memoria.foto1 });
            deck.push({ id: memoria.id, foto: memoria.foto2 });
        });

        // Garantir que temos 12 cartas se forem 6 memórias
        deck = embaralhar(deck);

        deck.forEach(item => {
            const card = document.createElement('div');
            card.className = 'game-card cursor-pointer';
            card.dataset.id = item.id;
            
            card.innerHTML = `
                <div class="card-inner w-full h-full relative">
                    <div class="card-back absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden border border-outline/20">
                        <div class="romantic-pattern absolute inset-0"></div>
                        <span class="material-symbols-outlined text-primary/40 text-4xl">favorite</span>
                    </div>
                    <div class="card-front absolute inset-0 flex items-center justify-center rounded-lg border-2 border-primary-container bg-surface-container-lowest overflow-hidden">
                        <img src="${item.foto}" class="w-full h-full object-cover">
                    </div>
                </div>
            `;
            
            card.addEventListener('click', virarCarta);
            grid.appendChild(card);
        });
    }

    init();
});
