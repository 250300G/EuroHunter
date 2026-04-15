class Man {
  constructor() {
    this.node = document.createElement("img")
    this.node.src = "./images/man.png"
    gameBoxNode.append(this.node)
    this.x = 300
    this.y = 350
    this.width = 40
    this.height = 35
    this.node.style.width = `${this.width}px`
    this.node.style.height = `${this.height}px`
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  } 

 
  // gravity() {
  //   this.y += this.gravitySpeed
  //   this.node.style.top = `${this.y}px`
  // }

  // jump() {
  //   this.y -= this.jumpSpeed
  //   this.node.style.top = `${this.y}px`
  // }

} 