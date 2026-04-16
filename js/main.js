
const CONFIG = {
  gameLoopInterval: 16,       // ms entre chaque frame
  spawnInterval: 800,         // ms entre chaque élément
  inactivityLimit: 120000,    // ms avant game over par inactivité
  speedIncreaseInterval: 5000, // ms entre chaque accélération
  speedMultiplier: 1.2        // facteur d'accélération
}






//* GLOBAL DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")
const startBtnNode = document.querySelector("#start-btn")
const gameBoxNode = document.querySelector("#game-box")
const scoreValueNode = document.querySelector("#score-val")
const pauseBtnNode = document.querySelector("#pause-btn")
const restartBtnNode = document.querySelector("#restart-btn")

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
let fallingElements = []
let score = 0
let keysPressed = {} 

let isPaused = false
let lastActivityTime = Date.now()

//* FONCTIONS PRINCIPALES

function gameStart() {
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"
  resetGame();
  gameIntervalId = setInterval(gameLoop, 16) 
  elementSpawnIntervalId = setInterval(spawnElement, 800) 
  bgMusic.play().catch(() => {});
  lastActivityTime = Date.now()
}

function resetGame() {
  score = 0
  isPaused = false
  if (scoreValueNode) scoreValueNode.innerText = score
  fallingElements = []
  gameBoxNode.innerHTML = "" 
  manObj = new Man()
  if(pauseBtnNode) pauseBtnNode.innerText = "Pause"
}

function gameLoop() {
  if (Date.now() - lastActivityTime > 120000) {
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

// UNE SEULE togglePause avec gestion audio
function togglePause() {
  isPaused = !isPaused;
  pauseBtnNode.innerText = isPaused ? "Resume" : "Pause";
  if (isPaused) {
    clearInterval(elementSpawnIntervalId);
    bgMusic.pause();
  } else {
    elementSpawnIntervalId = setInterval(spawnElement, 800);
    bgMusic.play();
  }
}

function handleImpact(el, index) {
  score += el.value
  if (scoreValueNode) scoreValueNode.innerText = score
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
  bgMusic.pause();
  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"
  clearInterval(timerIntervalId);













  
}

function checkCollision(obj1, obj2) {
  return (obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y);
}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", gameStart)
pauseBtnNode.addEventListener("click", togglePause)

restartBtnNode.addEventListener("click", () => {
  clearInterval(gameIntervalId)
  clearInterval(elementSpawnIntervalId)
  gameStart()
})

window.addEventListener("keydown", (e) => {
  keysPressed[e.code] = true
  lastActivityTime = Date.now()
})

window.addEventListener("keyup", (e) => {
  keysPressed[e.code] = false
})