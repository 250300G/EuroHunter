

//* GLOBAL DOM ELEMENTS

// screens
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// buttons
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")

 

//* GLOBAL GAME VARIABLES
let manObj = null // at plash screen, the game has not started, so the man should not be created yet.
// let tubeObj = null
let elementArray = []

let gameIntervalId = null;
let elementSpawnIntervalId = null;
 
//* GLOBAL GAME FUNCTIONS
function gameStart() {

  // changing the states
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"

  // starting the main game inchekoutterval
  gameIntervalId = setInterval(gameLoop, Math.floor(1000/60))

  // Adding the initial elements of the game
  manObj = new Man()
  console.log(manObj)

  // tubeObj = new Tube()
  // console.log(tubeObj)


  // initialize the other intervals of the game
  tubeSpawnIntervalId = setInterval(spawnElement, 2000)

    update() {
    this.y += this.speed;       // chute : on incrémente Y à chaque frame
  }
}

function gameLoop() {
  // this is happening 60 times per second. We should add all automatic movements, collisions and animations here.
  birdObj.gravity()
  // tubeObj.automaticMovement()
  tubesArray.forEach((tubeObj) => {
    tubeObj.automaticMovement()
  })
  tubeDespawnCheck()
  ManelementCollitionCheck()
}

function spawnElement() {

  // random falling


function tubeDespawnCheck() {
  tubesArray.forEach((tubeObj, index) => {
    if (tubeObj.x <= 0) {
      console.log("one tube found exiting the screen")

      // When we want to remove an element from the game we need to remove it from both environments:
      //1. DOM environment
      tubeObj.node.remove()
      //2 JS environment
      tubesArray.splice(index, 1)

    }
  })
}

function birdTubeCollitionCheck() {

  // birdObj
  // tubeObj
  tubesArray.forEach((tubeObj) => {
    let isColliding = collisionCheck(birdObj, tubeObj)
    if (isColliding === true) {
      gameOver()
    }
  })

}

function collisionCheck(player) {
  return 
   //Distance  entre les centres
    const dx = this.x - (player.x + player.w / 2);
    const dy = this.y - (player.y + player.h / 2);
    return Math.sqrt(dx*dx + dy*dy) < this.radius + 20; // collision circulaire
  }
}

//fonction update
  update() {
    this.y += this.speed;       // chute : on incrémente Y à chaque frame
  }

  isOutOfBounds(canvasHeight) {
    return this.y - this.radius > canvasHeight; // sorti par le bas ?
  }

function gameOver() {

  //1. stop all intervals
  clearInterval(gameIntervalId)
  clearInterval(tubeSpawnIntervalId)

  //2. change states
  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"

  //3. restart all game variables and clear the DOM
  //! this is important to be able to restart the game
}


 
//* EVENT LISTENERS
startBtnNode.addEventListener("click", gameStart)
gameBoxNode.addEventListener("click", () => {
  birdObj.jump()
})

//* GLOBAL GAME FUNCTIONS
function gameStart() {
//console.log("clicking")
  // changing the states
 startScreenNode.style.display = "none"
 gameScreenNode.style.display = "flex"

  // starting the main game inchekoutterval
  gameIntervalId = setInterval(gameLoop, Math.floor(1000/60))

  // Adding the initial elements of the game
  manObj = new Man()
  console.log(manObj)

  // tubeObj = new Tube()
  // console.log(tubeObj)


  // initialize the other intervals of the game
  tubeSpawnIntervalId = setInterval(spawnElement, 2000)

}

// Planning

/*
  beginning page 

- when clicking the start button with the addEventListener 
  - change the screens 
  - starting the interval  
  - start with a man 


- creating the background                                             ✅
- creating the man 
  - create the class (x, y, width, height, jumpSpeed, gravitySpeed) 
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
