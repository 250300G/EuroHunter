//* GLOBAL DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")
const startBtnNode = document.querySelector("#start-btn")
const gameBoxNode = document.querySelector("#game-box")

//* GLOBAL GAME VARIABLES
let manObj = null
let gameIntervalId = null
let elementSpawnIntervalId = null   
let fallingElements = []           

//* FONCTIONS
function gameStart() {
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"

  manObj = new Man()
  console.log(manObj)

  gameIntervalId = setInterval(gameLoop, Math.floor(1000 / 60))
  elementSpawnIntervalId = setInterval(spawnElement, 2000)  
}

function gameLoop() {
 
  fallingElements.forEach((el) => {
    el.update()
    el.node.style.top  = `${el.y}px`
    el.node.style.left = `${el.x}px`
  })

  /*  supprime les éléments sortis par le bas */
  fallingElements = fallingElements.filter((el) => {
    if (el.y > gameBoxNode.offsetHeight) {
       /*  passe la largeur réelle */
      el.node.remove()   
      return false
    }
    return true
  })
}  

function spawnElement() {
   /*  passe la largeur réelle */
  const newElement = new ChuteElement(gameBoxNode.offsetWidth)
  
  /*  ajoute l'image au DOM */
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

 //
 
// Planning

/*
  beginning page 

- when clicking the start button with the addEventListener 
                 - change the screens 
  - starting the interval  
  - start with a man 


- creating the background  ✅
- creating the man  ✅
  - create the class (x, y, width, height, gravitySpeed for elements) 
  - automatic gravity effect 
  - avoids when the user triggers something (click)
  
  
- creating the elements 
  - create the class (x, y, width, height, speed) 
  - elements will move automatically fall


- collision between the man and the elements 

- spawn elements as the game progresses 
  - random y 
  - two at a time with differente images and y 
- despawn the tubes once they exit the screen 


BONUS
- Score
- changing the speed
- random trigger
- flap animations
- rotation when jumping or moving down
*/
