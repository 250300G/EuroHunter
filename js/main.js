const isMobile = window.matchMedia("(max-width: 768px)").matches;

const CONFIG = {
  spawnInterval: isMobile ? 1200 : 800, 
  gameDuration: 180, 
  musicSpeed: isMobile ? 0.9 : 1.0,
  moveSpeed: isMobile ? 8 : 6,
  fps: 16,
  speedIncrement: 1.5,  
  intervalReduction: 200  
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
let fallingElements = [];
let keysPressed = {};
let lastActivityTime = Date.now(); // 

//* INITIALISATION
function gameStart() {
    startScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";
    gameOverScreenNode.style.display = "none";
    
    // Reset variables
    score = 0;
    timeLeft = CONFIG.gameDuration;
    fallingElements = [];
    isPaused = false; 
    pauseBtnNode.innerText = "Pause";
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

            // --- ACCELERATION EVERY 60 SECONDS ---
            if (timeLeft === 120 || timeLeft === 60) {
                increaseDifficulty();
            }

            if (timeLeft <= 0) gameOver();
        }
    }, 1000);
}

function increaseDifficulty() {
    clearInterval(spawnIntervalId);
    let currentInterval = isMobile ? 1200 : 800;
    let newInterval = timeLeft === 120 ? currentInterval - 200 : currentInterval - 400;
    spawnIntervalId = setInterval(spawnElement, newInterval);
    console.log("Difficulty increased!");
}

function spawnElement() {
    if (isPaused) return;
    const newElement = new ChuteElement(gameBoxNode.offsetWidth);
    gameBoxNode.append(newElement.node);
    fallingElements.push(newElement);
}

function gameLoop() {
    if (isPaused) return;

    // 1. Player movement
    if (manObj) {
        manObj.move(keysPressed);
    }

    // 2. Falling elements movement
    for (let i = fallingElements.length - 1; i >= 0; i--) {
        const el = fallingElements[i];
        el.update();
        
        el.node.style.top  = `${el.y}px`;
        el.node.style.left = `${el.x}px`;

        // 3. Collision detection
        if (manObj && checkCollision(manObj, el)) {
            handleImpact(el, i);
        } 
        // 4. Remove if out of screen
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
    
    scoreValueNode.style.color = el.value > 0 ? "#bcd6c7" : "#e74c3c";
    setTimeout(() => { scoreValueNode.style.color = "black"; }, 300);

    el.node.remove();
    fallingElements.splice(index, 1);

    if (el.value < 0 && window.navigator.vibrate) {
        window.navigator.vibrate(100); 
    }
}

function togglePause() {
    isPaused = !isPaused;
    pauseBtnNode.innerText = isPaused ? "Resume" : "Pause";
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

//* TOUCH & KEYBOARD
gameBoxNode.addEventListener("touchmove", (e) => {
    if (isPaused || !manObj) return;
    e.preventDefault();
    let touch = e.touches[0];
    let rect = gameBoxNode.getBoundingClientRect();
    let touchX = touch.clientX - rect.left;
    let touchY = touch.clientY - rect.top;
    
    manObj.x = touchX - (manObj.width / 2);
    manObj.y = touchY - (manObj.height / 2);
    
    if (manObj.x < 0) manObj.x = 0;
    if (manObj.y < 0) manObj.y = 0;
    if (manObj.x > gameBoxNode.offsetWidth  - manObj.width)  manObj.x = gameBoxNode.offsetWidth  - manObj.width;
    if (manObj.y > gameBoxNode.offsetHeight - manObj.height) manObj.y = gameBoxNode.offsetHeight - manObj.height;
    
    manObj.updatePosition();
}, { passive: false });

window.addEventListener("keydown", (e) => { keysPressed[e.code] = true; });
window.addEventListener("keyup",   (e) => { keysPressed[e.code] = false; });

//* EVENT LISTENERS
startBtnNode.addEventListener("click", gameStart);
pauseBtnNode.addEventListener("click", togglePause);
restartBtnNode.addEventListener("click", () => {
    clearInterval(gameIntervalId);
    clearInterval(spawnIntervalId);
    clearInterval(timerIntervalId);
    bgMusic.pause();
    gameStart();
});
muteBtnNode.addEventListener("click", () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtnNode.innerText = bgMusic.muted ? "🔈" : "🔊";
});
document.querySelector("#restart-btn-over").addEventListener("click", () => gameStart());
