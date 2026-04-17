class Man {
  constructor() {
    
    this.node = document.createElement("img");
    this.node.src = "./images/man.png";

    // 2. CONFIGURATION DU STYLE
    this.node.style.position = "absolute";
    this.node.style.zIndex = "10";

    // 3. ATTACHEMENT AU JEU
    gameBoxNode.append(this.node);

    // 4. DIMENSIONS ET POSITION INITIALE
    this.width  = 40;
    this.height = 35;
    this.speed  = 5;

    //  RESPONSIVE :
    // Position de départ calculée en % du gameBox réel,
   
    this.x = gameBoxNode.offsetWidth  * 0.45; // ~45% de la largeur
    this.y = gameBoxNode.offsetHeight * 0.45; // ~45% de la hauteur

    // 5. APPLICATION INITIALE DES STYLES
    this.node.style.width  = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.updatePosition();
  }

  move(keysPressed) {
    if (keysPressed["ArrowUp"]    && this.y > 0)
      this.y -= this.speed;

    if (keysPressed["ArrowDown"]  && this.y < gameBoxNode.offsetHeight - this.height)
      this.y += this.speed;

    if (keysPressed["ArrowLeft"]  && this.x > 0)
      this.x -= this.speed;

    if (keysPressed["ArrowRight"] && this.x < gameBoxNode.offsetWidth - this.width)
      this.x += this.speed;

    this.updatePosition();
  }

  updatePosition() {
    this.node.style.top  = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }
}
