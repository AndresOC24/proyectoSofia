const gameData = {
    1: [
        {"id":"a","type":"image","src":"images/team/letraA.webp","label":"A"},
        {"id":"a","type":"text","label":"A"},
        {"id":"b","type":"image","src":"images/team/letraB.webp","label":"B"},
        {"id":"b","type":"text","label":"B"},
        {"id":"c","type":"image","src":"images/team/letraC.webp","label":"C"},
        {"id":"c","type":"text","label":"C"},
        {"id":"d","type":"image","src":"images/team/letraD.webp","label":"D"},
        {"id":"d","type":"text","label":"D"},
        {"id":"e","type":"image","src":"images/team/letraE.webp","label":"E"},
        {"id":"e","type":"text","label":"E"}
    ],
    2: [
        {"id":"hola","type":"image","src":"images/team/hola.webp","label":"Hola"},
        {"id":"hola","type":"text","label":"Hola"},
        {"id":"gracias","type":"image","src":"images/team/gracias.jpg","label":"Gracias"},
        {"id":"gracias","type":"text","label":"Gracias"},
        {"id":"adios","type":"image","src":"images/team/adios.jpg","label":"Adios"},
        {"id":"adios","type":"text","label":"Adios"},
        {"id":"porfavor","type":"image","src":"images/team/porfavor.jpeg","label":"Por favor"},
        {"id":"porfavor","type":"text","label":"Por favor"},
        {"id":"denada","type":"image","src":"images/team/denada.jpg","label":"De nada"},
        {"id":"denada","type":"text","label":"De nada"},
        {"id":"buenos","type":"image","src":"images/team/buenosdias.jpg","label":"Buenos dias"},
        {"id":"buenos","type":"text","label":"Buenos dias"}
    ],
    3: [
        {"id":"uno","type":"image","src":"images/team/uno.jpg","label":"1"},
        {"id":"uno","type":"text","label":"1"},
        {"id":"dos","type":"image","src":"images/team/dos.webp","label":"2"},
        {"id":"dos","type":"text","label":"2"},
        {"id":"tres","type":"image","src":"images/team/tres.webp","label":"3"},
        {"id":"tres","type":"text","label":"3"},
        {"id":"cuatro","type":"image","src":"images/team/cuatro.jpg","label":"4"},
        {"id":"cuatro","type":"text","label":"4"},
        {"id":"cinco","type":"image","src":"images/team/cinco.webp","label":"5"},
        {"id":"cinco","type":"text","label":"5"},
        {"id":"diez","type":"image","src":"images/team/diez.jpg","label":"10"},
        {"id":"diez","type":"text","label":"10"},
        {"id":"veinte","type":"image","src":"images/team/veinte.png","label":"20"},
        {"id":"veinte","type":"text","label":"20"}
    ]
};

let currentLevel = 1;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let fails = 0;
let startTime = null;
let timerInterval = null;
let canFlip = true;

const cardsGrid = document.getElementById('cardsGrid');
const movesEl = document.getElementById('moves');
const matchesEl = document.getElementById('matches');
const timerEl = document.getElementById('timer');
const failsEl = document.getElementById('fails');
const resetBtn = document.getElementById('resetBtn');
const levelBtns = document.querySelectorAll('.level-btn');
const victoryMessage = document.getElementById('victoryMessage');
const victoryStats = document.getElementById('victoryStats');

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function initGame(level) {
    currentLevel = level;
    cards = shuffleArray([...gameData[level]]);
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    fails = 0;
    canFlip = true;
    
    movesEl.textContent = '0';
    matchesEl.textContent = '0';
    timerEl.textContent = '00:00';
    failsEl.textContent = '0';
    
    victoryMessage.classList.remove('show');
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    startTime = null;
    
    renderCards();
}

function renderCards() {
    cardsGrid.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardEl = document.createElement('button');
        cardEl.className = 'card';
        cardEl.setAttribute('aria-pressed', 'false');
        cardEl.setAttribute('aria-label', `Carta ${index + 1}`);
        cardEl.dataset.index = index;
        cardEl.dataset.id = card.id;
        cardEl.dataset.type = card.type;
        
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        
        if (card.type === 'image') {
            const img = document.createElement('img');
            img.src = card.src;
            img.alt = `Seña: ${card.label}`;
            img.className = 'card-image';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            cardContent.appendChild(img);
        } else {
            cardContent.textContent = card.label;
        }
        
        cardInner.appendChild(cardContent);
        cardEl.appendChild(cardInner);
        
        cardEl.addEventListener('click', () => handleCardClick(cardEl, card));
        
        cardsGrid.appendChild(cardEl);
    });
}

function handleCardClick(cardEl, card) {
    if (!canFlip) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;
    
    if (!startTime) {
        startTime = Date.now();
        startTimer();
    }
    
    cardEl.classList.add('flipped');
    cardEl.setAttribute('aria-pressed', 'true');
    flippedCards.push({element: cardEl, data: card});
    
    if (flippedCards.length === 2) {
        moves++;
        movesEl.textContent = moves;
        canFlip = false;
        
        setTimeout(() => checkMatch(), 800);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.data.id === card2.data.id) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
        
        matchedPairs++;
        matchesEl.textContent = matchedPairs;
        
        const totalPairs = cards.length / 2;
        if (matchedPairs === totalPairs) {
            endGame();
        }
    } else {
        card1.element.classList.add('wrong');
        card2.element.classList.add('wrong');
        
        fails++;
        failsEl.textContent = fails;
        
        setTimeout(() => {
            card1.element.classList.remove('flipped', 'wrong');
            card2.element.classList.remove('flipped', 'wrong');
            card1.element.setAttribute('aria-pressed', 'false');
            card2.element.setAttribute('aria-pressed', 'false');
        }, 500);
    }
    
    flippedCards = [];
    canFlip = true;
}

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        timerEl.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const failRate = (fails / matchedPairs).toFixed(2);
    
    victoryStats.textContent = `Tiempo: ${minutes}m ${seconds}s | Movimientos: ${moves} | Tasa de error: ${failRate}`;
    victoryMessage.classList.add('show');
}

levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        levelBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const level = parseInt(btn.dataset.level);
        initGame(level);
    });
});

resetBtn.addEventListener('click', () => {
    initGame(currentLevel);
});

initGame(1);