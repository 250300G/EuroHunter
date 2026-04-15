//* GLOBAL DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")
const startBtnNode = document.querySelector("#start-btn")
const gameBoxNode = document.querySelector("#game-box")
const scoreValueNode = document.querySelector("#score-val") // VERDISSAGE : Cible pour le score

//* GLOBAL GAME VARIABLES
let manObj = null
let gameIntervalId = null
let elementSpawnIntervalId = null   
let fallingElements = []
let score = 0 // VERDISSAGE : Initialisation du compteur
let keysPressed = {} // VERDISSAGE : Stockage des touches pour la fluidité

//* FONCTIONS
function gameStart() {
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"

  // Réinitialisation si nouvelle partie
  score = 0
  if(scoreValueNode) scoreValueNode.innerText = score
  fallingElements = []
  gameBoxNode.innerHTML = "" 

  manObj = new Man()

  // Lancement des boucles
  gameIntervalId = setInterval(gameLoop, Math.floor(1000 / 60))

  elementSpawnIntervalId = setInterval(spawnElement, 800)  
}

function gameLoop() {
  // 1. Déplacement de Man (Fluide)
  if (manObj) {
    manObj.move(keysPressed)
  }

  // 2. Déplacement des éléments qui tombent
  fallingElements.forEach((el) => {
    el.update()
    el.node.style.top  = `${el.y}px`
    el.node.style.left = `${el.x}px`

  })

  // 3. Nettoyage des éléments sortis de l'écran
  fallingElements = fallingElements.filter((el) => {
    if (el.y > gameBoxNode.offsetHeight) {
      el.node.remove()   
      return false
    }
    return true
  })
}  

function spawnElement() {
  const newElement = new ChuteElement(gameBoxNode.offsetWidth)
  gameBoxNode.append(newElement.node)                                  
  fallingElements.push(newElement)
}

function gameOver() {
  clearInterval(gameIntervalId)
  clearInterval(elementSpawnIntervalId) 
  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"
}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", gameStart)

// VERDISSAGE : Écouteurs pour le mouvement fluide (4 directions)
window.addEventListener("keydown", (event) => {
  keysPressed[event.code] = true
})

window.addEventListener("keyup", (event) => {
  keysPressed[event.code] = false
})