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
        {"id":"e","type":"text","label":"E"},
        {"id":"f","type":"image","src":"images/team/letraF.jpg","label":"F"},
        {"id":"f","type":"text","label":"F"},
        {"id":"g","type":"image","src":"images/team/letraG.jpg","label":"G"},
        {"id":"g","type":"text","label":"G"},
        {"id":"h","type":"image","src":"images/team/letraH.jpg","label":"H"},
        {"id":"h","type":"text","label":"H"},
        {"id":"i","type":"image","src":"images/team/letraI.jpg","label":"I"},
        {"id":"i","type":"text","label":"I"},
        {"id":"j","type":"image","src":"images/team/letraJ.jpg","label":"J"},
        {"id":"j","type":"text","label":"J"},
        {"id":"k","type":"image","src":"images/team/letraK.webp","label":"K"},
        {"id":"k","type":"text","label":"K"} ,
        {"id":"l","type":"image","src":"images/team/letraL.jpg","label":"L"},
        {"id":"l","type":"text","label":"L"},
        {"id":"m","type":"image","src":"images/team/letraM.jpg","label":"M"},
        {"id":"m","type":"text","label":"M"},
        {"id":"n","type":"image","src":"images/team/letraN.jpg","label":"N"},
        {"id":"n","type":"text","label":"N"},
        {"id":"o","type":"image","src":"images/team/letraO.jpg","label":"O"},
        {"id":"o","type":"text","label":"O"},
        {"id":"p","type":"image","src":"images/team/letraP.jpg","label":"P"},
        {"id":"p","type":"text","label":"P"},
        {"id":"q","type":"image","src":"images/team/letraQ.jpg","label":"Q"},
        {"id":"q","type":"text","label":"Q"},
        {"id":"r","type":"image","src":"images/team/letraR.webp","label":"R"},
        {"id":"r","type":"text","label":"R"},
        {"id":"s","type":"image","src":"images/team/letraS.jpg","label":"S"},
        {"id":"s","type":"text","label":"S"},
        {"id":"t","type":"image","src":"images/team/letraT.jpg","label":"T"},
        {"id":"t","type":"text","label":"T"},
        {"id":"u","type":"image","src":"images/team/letraU.webp","label":"U"},
        {"id":"u","type":"text","label":"U"},
        {"id":"v","type":"image","src":"images/team/letraV.webp","label":"V"},
        {"id":"v","type":"text","label":"V"},
        {"id":"w","type":"image","src":"images/team/letraW.jpg","label":"W"},
        {"id":"w","type":"text","label":"W"},
        {"id":"x","type":"image","src":"images/team/letraX.webp","label":"X"},
        {"id":"x","type":"text","label":"X"},
        {"id":"y","type":"image","src":"images/team/letraY.jpg","label":"Y"},
        {"id":"y","type":"text","label":"Y"},
        {"id":"z","type":"image","src":"images/team/letraZ.jpg","label":"Z"},
        {"id":"z","type":"text","label":"Z"}                                                                                                                                                                               
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
        {"id":"seis","type":"image","src":"images/team/seis.png","label":"6"},
        {"id":"seis","type":"text","label":"6"},
        {"id":"siete","type":"image","src":"images/team/siete.jpg","label":"7"},
        {"id":"siete","type":"text","label":"7"},
        {"id":"ocho","type":"image","src":"images/team/siete.jpg","label":"8"},
        {"id":"ocho","type":"text","label":"8"},
        {"id":"nueve","type":"image","src":"images/team/nueve.png","label":"9"},
        {"id":"nueve","type":"text","label":"9"},
        {"id":"diez","type":"image","src":"images/team/diez.jpg","label":"10"},
        {"id":"diez","type":"text","label":"7"}                        
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