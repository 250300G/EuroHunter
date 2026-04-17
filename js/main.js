const isMobile = window.matchMedia("(max-width: 768px)").matches;

const CONFIG = {
  spawnInterval: isMobile ? 1200 : 800, 
  gameDuration: 180, 
  musicSpeed: isMobile ? 0.9 : 1.0,
  moveSpeed: isMobile ? 8 : 6, // Vitesse de déplacement du personnage
  fps: 16 // ~60 images par seconde
};

//* DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const startBtnNode = document.querySelector("#start-btn");
const gameBoxNode = document.querySelector("#game-box");
const scoreValueNode = document.querySelector("#score-val");
const timerValueNode = document.querySelector("#timer-val");
const finalScoreNode = document.querySelector("#final-score-val");
const pauseBtnNode = document.querySelector("#pause-btn");
const restartBtnNode = document.querySelector("#restart-btn");
const muteBtnNode = document.querySelector("#mute-btn");
const bgMusic = document.querySelector("#bg-music");

let score = 0;
let timeLeft = CONFIG.gameDuration;
let gameIntervalId, spawnIntervalId, timerIntervalId;
let isPaused = false;
let manObj = null;
let fallingElements = []; // Liste pour stocker les objets qui tombent
let keysPressed = {}; // Pour la gestion du clavier

//* INITIALISATION
function gameStart() {
    startScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";
    gameOverScreenNode.style.display = "none";
    
    // Reset variables
    score = 0;
    timeLeft = CONFIG.gameDuration;
    fallingElements = [];
    gameBoxNode.innerHTML = "";
    scoreValueNode.innerText = score;
    timerValueNode.innerText = timeLeft;
    
    manObj = new Man(); 
    
    bgMusic.playbackRate = CONFIG.musicSpeed;
    bgMusic.play();
    
    gameIntervalId = setInterval(gameLoop, CONFIG.fps);
    spawnIntervalId = setInterval(spawnElement, CONFIG.spawnInterval);
    startTimer();
}

function startTimer() {
    if (timerIntervalId) clearInterval(timerIntervalId);
    timerIntervalId = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            timerValueNode.innerText = timeLeft;
            if (timeLeft <= 0) gameOver();
        }
    }, 1000);
}

function spawnElement() {
    if (isPaused) return;
    const newElement = new ChuteElement(gameBoxNode.offsetWidth);
    gameBoxNode.append(newElement.node);
    fallingElements.push(newElement);
}

function gameLoop() {
    if (isPaused) return;

    // 1. Mouvement du personnage
    if (manObj) {
        manObj.move(keysPressed);
    }

    // 2. Mouvement des éléments qui tombent
    for (let i = fallingElements.length - 1; i >= 0; i--) {
        const el = fallingElements[i];
        el.update(); // Met à jour sa coordonnée Y interne
        
        // Appliquer la position au DOM
        el.node.style.top = `${el.y}px`;
        el.node.style.left = `${el.x}px`;

        // 3. Détection de collision
        if (manObj && checkCollision(manObj, el)) {
            handleImpact(el, i);
        } 
        // 4. Suppression si l'élément sort de l'écran
        else if (el.y > gameBoxNode.offsetHeight) {
            el.node.remove();
            fallingElements.splice(i, 1);
        }
    }
}

function checkCollision(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

function handleImpact(el, index) {
    score += el.value;
    scoreValueNode.innerText = score;
    
    // Animation visuelle rapide sur le score
    scoreValueNode.style.color = el.value > 0 ? "#2ecc71" : "#e74c3c";
    setTimeout(() => { scoreValueNode.style.color = "black"; }, 300);

    el.node.remove();
    fallingElements.splice(index, 1);
}

function togglePause() {
    isPaused = !isPaused;
    pauseBtnNode.innerText = isPaused ? "Reprendre" : "Pause";
    if (isPaused) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
}

function gameOver() {
    clearInterval(gameIntervalId);
    clearInterval(spawnIntervalId);
    clearInterval(timerIntervalId);
    bgMusic.pause();
    finalScoreNode.innerText = score;
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
}

//* TACTILE ET CLAVIER
gameBoxNode.addEventListener("touchmove", (e) => {
    if (isPaused || !manObj) return;
    e.preventDefault();
    let touch = e.touches[0];
    let rect = gameBoxNode.getBoundingClientRect();
    let touchX = touch.clientX - rect.left;
    let touchY = touch.clientY - rect.top;
    
    manObj.x = touchX - (manObj.width / 2);
    manObj.y = touchY - (manObj.height / 2);
    
    // Limites de la zone
    if (manObj.x < 0) manObj.x = 0;
    if (manObj.y < 0) manObj.y = 0;
    if (manObj.x > gameBoxNode.offsetWidth - manObj.width) manObj.x = gameBoxNode.offsetWidth - manObj.width;
    if (manObj.y > gameBoxNode.offsetHeight - manObj.height) manObj.y = gameBoxNode.offsetHeight - manObj.height;
    
    manObj.updatePosition();
}, { passive: false });

window.addEventListener("keydown", (e) => { keysPressed[e.code] = true; });
window.addEventListener("keyup", (e) => { keysPressed[e.code] = false; });

//* EVENT LISTENERS
startBtnNode.addEventListener("click", gameStart);
pauseBtnNode.addEventListener("click", togglePause);
restartBtnNode.addEventListener("click", () => {
    clearInterval(gameIntervalId);
    clearInterval(spawnIntervalId);
    clearInterval(timerIntervalId);
    gameStart();
});
muteBtnNode.addEventListener("click", () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtnNode.innerText = bgMusic.muted ? "🔈" : "🔊";
});
document.querySelector("#restart-btn-over").addEventListener("click", () => gameStart());