class Man {

  constructor() {
    this.node = document.createElement("img")
    this.node.src = "./images/man.png"
    gameBoxNode.append(this.node) // as soon as the object is created, add the node to the game screen

    this.x = 50
    this.y = 60
    this.width = 40
    this.height = 35

    // initial adjustments of styles
    this.node.style.width = `${this.width}px`
    this.node.style.height = `${this.height}px`
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

    //this.gravitySpeed = 2
    //this.jumpSpeed = 40

  }

  gravity() {
    //this.y += this.gravitySpeed
   // this.node.style.top = `${this.y}px`
    //! everytime we adjust a numerical value like y, x, width or height, WE NEED TO ADJUST THE NODE (width, height, top or left)
  }

  jump() {
    this.y -= this.jumpSpeed
    this.node.style.top = `${this.y}px`
  }

}