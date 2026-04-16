const CONFIG = {
  gameLoopInterval: 16,       // ms entre chaque frame
  spawnInterval: 800,         // ms entre chaque élément
  inactivityLimit: 120000,    // ms avant game over par inactivité
  gameDuration: 180,           // DURÉE DU JEU EN SECONDES (Paramètre ajouté)
  speedIncreaseInterval: 5000, 
  speedMultiplier: 1.5     
}

//* GLOBAL DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")
const startBtnNode = document.querySelector("#start-btn")
const gameBoxNode = document.querySelector("#game-box")
const scoreValueNode = document.querySelector("#score-val")
const timerValueNode = document.querySelector("#timer-val") // Ajouté pour le temps
const pauseBtnNode = document.querySelector("#pause-btn")
const restartBtnNode = document.querySelector("#restart-btn")
const finalScoreNode = document.querySelector("#final-score-val") // Pour l'écran de fin
const restartBtnOverNode = document.querySelector("#restart-btn-over") // Bouton Rejouer fin

const muteBtnNode = document.querySelector("#mute-btn");
const bgMusic = document.querySelector("#bg-music");
const impactSound = document.querySelector("#impact-sound");

let isMuted = false;

function toggleMute() {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    impactSound.muted = isMuted;
    muteBtnNode.innerText = isMuted ? "🔈" : "🔊";
}

if (muteBtnNode) {
    muteBtnNode.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMute();
    });
}

//* GLOBAL GAME VARIABLES
let manObj = null
let gameIntervalId = null
let elementSpawnIntervalId = null   
let timerIntervalId = null // Ajouté pour le chrono
let fallingElements = []
let score = 0
let timeLeft = 0 // Ajouté
let keysPressed = {} 

let isPaused = false
let lastActivityTime = Date.now()

//* FONCTIONS PRINCIPALES

function gameStart() {
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"
  gameOverScreenNode.style.display = "none" // Cache l'écran de fin si on recommence
  
  resetGame();
  
  gameIntervalId = setInterval(gameLoop, CONFIG.gameLoopInterval) 
  elementSpawnIntervalId = setInterval(spawnElement, CONFIG.spawnInterval) 
  
  startTimer(); // Lance le décompte
  
  bgMusic.play().catch(() => {});
  lastActivityTime = Date.now()
}

function resetGame() {
  score = 0
  timeLeft = CONFIG.gameDuration // Initialise avec la valeur de la CONFIG
  isPaused = false
  if (scoreValueNode) scoreValueNode.innerText = score
  if (timerValueNode) timerValueNode.innerText = timeLeft
  fallingElements = []
  gameBoxNode.innerHTML = "" 
  manObj = new Man()
  if(pauseBtnNode) pauseBtnNode.innerText = "Pause"
}

function gameLoop() {
  // Sécurité inactivité
  if (Date.now() - lastActivityTime > CONFIG.inactivityLimit) {
    gameOver();
    return;
  }

  if (isPaused) return;

  if (manObj) {
    manObj.move(keysPressed)
  }

  for (let i = fallingElements.length - 1; i >= 0; i--) {
    const el = fallingElements[i]
    el.update()
    el.node.style.top = `${el.y}px`
    el.node.style.left = `${el.x}px`

    if (manObj && checkCollision(manObj, el)) {
      handleImpact(el, i)
    } 
    else if (el.y > gameBoxNode.offsetHeight) {
      el.node.remove()
      fallingElements.splice(i, 1)
    }
  }
}

function startTimer() {
  if (timerIntervalId) clearInterval(timerIntervalId);
  timerIntervalId = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      if (timerValueNode) timerValueNode.innerText = timeLeft;
      if (timeLeft <= 0) gameOver();
    }
  }, 1000);
}

function togglePause() {
  isPaused = !isPaused;
  pauseBtnNode.innerText = isPaused ? "Resume" : "Pause";
  if (isPaused) {
    clearInterval(elementSpawnIntervalId);
    bgMusic.pause();
  } else {
    elementSpawnIntervalId = setInterval(spawnElement, CONFIG.spawnInterval);
    bgMusic.play();
  }
}

function handleImpact(el, index) {
  score += el.value
  if (scoreValueNode) scoreValueNode.innerText = score
  
  // Joue le son d'impact
  if (impactSound) {
    impactSound.currentTime = 0;
    impactSound.play();
  }

  el.node.remove()
  fallingElements.splice(index, 1)
}

function spawnElement() {
  if (isPaused) return;
  const newElement = new ChuteElement(gameBoxNode.offsetWidth)
  gameBoxNode.append(newElement.node)                                  
  fallingElements.push(newElement)
}

function gameOver() {
  clearInterval(gameIntervalId)
  clearInterval(elementSpawnIntervalId) 
  clearInterval(timerIntervalId);
  
  bgMusic.pause();
  
  // Affichage du score final
  if (finalScoreNode) finalScoreNode.innerText = score;

  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"
}

function checkCollision(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width && 
    obj1.x + obj1.width > obj2.x && 
    obj1.y < obj2.y + obj2.height && 
    obj1.y + obj1.height > obj2.y
  );
}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", gameStart)
pauseBtnNode.addEventListener("click", togglePause)

// Bouton Restart en cours de jeu
restartBtnNode.addEventListener("click", () => {
  clearInterval(gameIntervalId)
  clearInterval(elementSpawnIntervalId)
  clearInterval(timerIntervalId)
  gameStart()
})

// Bouton Rejouer sur l'écran Game Over
if (restartBtnOverNode) {
    restartBtnOverNode.addEventListener("click", gameStart);
}

window.addEventListener("keydown", (e) => {
  keysPressed[e.code] = true
  lastActivityTime = Date.now()
})

window.addEventListener("keyup", (e) => {
  keysPressed[e.code] = false
})