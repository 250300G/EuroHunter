const ElementsImages = [
  "./images/car.png",
  "./images/cycling.png",
  "./images/phone.png",
  "./images/house.png"
];



class FallingItem {

  constructor() {

    // position aléatoire en haut de l’écran
    this.x = Math.random() * window.innerWidth;
    this.y = -50;

    // profondeur simple 
    this.depth = Math.random() * 1 + 0.5;

    // plus c’est loin → plus petit + plus lent
    this.size = 40 * this.depth;
    this.speed = 1.5 * this.depth;

    // image aléatoire
    this.img = document.createElement("img");
    this.img.src = itemsPool[Math.floor(Math.random() * itemsPool.length)];

    // DOM
    this.img.style.position = "absolute";
    this.img.style.width = `${this.size}px`;
    this.img.style.height = `${this.size}px`;

    gameBoxNode.append(this.img);
  }

  update() {

    // chute
    this.y += this.speed;

    // mise à jour DOM
    this.img.style.top = `${this.y}px`;
    this.img.style.left = `${this.x}px`;
  }

}