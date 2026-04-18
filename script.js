// --- CONTROLE DE ESTADO ---
const state = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  attempts: 0,
  isLocked: false
};

// --- ELEMENTOS DO DOM ---
const screens = {
  home: document.getElementById('home-section'),
  game: document.getElementById('game-section'),
  victory: document.getElementById('victory-section'),
  gallery: document.getElementById('gallery-section')
};

const el = {
  grid: document.getElementById('memory-grid'),
  galleryGrid: document.getElementById('gallery-grid'),
  attemptsLabel: document.getElementById('attempts'),
  finalAttempts: document.getElementById('final-attempts'),
  toast: document.getElementById('message-toast'),
  homeGalleryBtn: document.getElementById('home-gallery-btn'),
  
  // Botoes
  startBtn: document.getElementById('start-btn'),
  quitBtn: document.getElementById('quit-btn'),
  galleryBtn: document.getElementById('gallery-btn'),
  restartBtn: document.getElementById('restart-btn'),
  backHomeBtn: document.getElementById('back-home-btn')
};

// --- NAVEGACAO ---
// Troca as telas (apenas uma visivel por vez)
function showScreen(screenName) {
  Object.values(screens).forEach(sec => sec.classList.remove('active'));
  screens[screenName].classList.add('active');
  window.scrollTo(0,0);
}

// --- UTILITARIOS ---
// Algoritmo de Fisher-Yates para embaralhar as cartas
function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Mostra mensagem ao encontrar par e desaparece depois
let toastTimeout;
function showToast(message, duration = 3000) {
  clearTimeout(toastTimeout);
  el.toast.textContent = message;
  el.toast.classList.add('show');
  
  toastTimeout = setTimeout(() => {
    el.toast.classList.remove('show');
  }, duration);
}

// --- LOGICA DA GALERIA ---
// Verifica o localStorage se a galeria deve estar desbloqueada
function checkGalleryUnlock() {
  const unlocked = localStorage.getItem('velvet_gallery_unlocked') === 'true';
  if (unlocked) {
    el.homeGalleryBtn.style.display = 'block';
  }
}

// Desbloqueia galeria e salva estado
function unlockGallery() {
  localStorage.setItem('velvet_gallery_unlocked', 'true');
  checkGalleryUnlock();
}

// Monta o DOM da galeria a partir de data.js
function buildGallery() {
  el.galleryGrid.innerHTML = '';
  // Utiliza o array 'pairs' exportado globalmente por data.js
  pairs.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${item.image}" alt="Memory ${item.id}">
      <p>${item.message}</p>
    `;
    el.galleryGrid.appendChild(div);
  });
}

// --- LOGICA DO JOGO ---
function initGame() {
  // Reset de variaveis de controle
  state.flippedCards = [];
  state.matchedPairs = 0;
  state.attempts = 0;
  state.isLocked = false;
  el.attemptsLabel.textContent = '0';
  el.toast.classList.remove('show'); // garante q a notificação some no restart
  
  // Duplica os pares e cria o deck com um ID unico pra não bugar a referenca
  const deck = [];
  pairs.forEach(pair => {
    deck.push({ ...pair, uniqueId: pair.id + 'a' });
    deck.push({ ...pair, uniqueId: pair.id + 'b' });
  });
  
  // Embaralha o baralho criado (aplicavel em novo jogo, restart, ou on load se chamado)
  state.cards = shuffle(deck);
  
  // Renderiza no HTML
  renderGrid();
  showScreen('game');
}

function renderGrid() {
  el.grid.innerHTML = '';
  state.cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.dataset.index = index;
    // O innerHTML cria o contexto 3D para o flip do CSS
    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-back"></div>
        <div class="card-front">
          <img src="${card.image}" alt="Memory">
        </div>
      </div>
    `;
    
    // Adiciona evento de click controlando regras
    cardEl.addEventListener('click', () => handleCardClick(index, cardEl));
    el.grid.appendChild(cardEl);
  });
}

function handleCardClick(index, cardEl) {
  // Evita interacoes se jogo bloqueado, ou se a carta ja foi virada/combinada
  if (state.isLocked) return;
  if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

  // Vira a  carta
  cardEl.classList.add('flipped');
  state.flippedCards.push({ index, cardEl, data: state.cards[index] });

  // Dispara a validacao se duas foram encontradas
  if (state.flippedCards.length === 2) {
    state.attempts++;
    el.attemptsLabel.textContent = state.attempts;
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = state.flippedCards;
  const isMatch = card1.data.id === card2.data.id;

  if (isMatch) {
    state.matchedPairs++;
    
    // Animação de glow classificada pelo CSS
    card1.cardEl.classList.add('matched', 'glow');
    card2.cardEl.classList.add('matched', 'glow');
    
    // Dispara notificacao amigavel
    showToast(card1.data.message);
    
    // Remove glow após fim da animacao no CSS para focar nos proximos itens
    setTimeout(() => {
      card1.cardEl.classList.remove('glow');
      card2.cardEl.classList.remove('glow');
    }, 1500);

    state.flippedCards = [];

    // Validacao de Vitoria
    if (state.matchedPairs === pairs.length) {
      setTimeout(handleVictory, 1000);
    }
  } else {
    // Bloqueia cliques adicionais para prevenir bugs
    state.isLocked = true;
    
    // Desvira depois de ver
    setTimeout(() => {
      card1.cardEl.classList.remove('flipped');
      card2.cardEl.classList.remove('flipped');
      state.flippedCards = [];
      state.isLocked = false;
    }, 1000);
  }
}

function handleVictory() {
  el.finalAttempts.textContent = state.attempts;
  unlockGallery();
  showScreen('victory');
}

// --- EVENTOS DE CLIQUE ---
el.startBtn.addEventListener('click', initGame);
el.quitBtn.addEventListener('click', () => showScreen('home'));
el.restartBtn.addEventListener('click', initGame);

el.galleryBtn.addEventListener('click', () => {
  buildGallery();
  showScreen('gallery');
});
el.homeGalleryBtn.addEventListener('click', () => {
  buildGallery();
  showScreen('gallery');
});
el.backHomeBtn.addEventListener('click', () => showScreen('home'));

// --- INICIALIZACAO BÁSICA ---
document.addEventListener('DOMContentLoaded', () => {
  checkGalleryUnlock();
});
