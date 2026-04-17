function loadImg(src) {
  const img = new Image();
  img.src = src;
  return img;
}

const itemData = [
  { img: "./images/travelling.png", val: -50 },
  { img: "./images/car.png", val: -30 },
  { img: "./images/house.png", val: -200 },
  { img: "./images/cooking-home.png", val: 50 },
  { img: "./images/working2.png", val: 100 },
  { img: "./images/cycling.png", val: 20 },
  { img: "./images/saving.png", val: 30 }
];

class ChuteElement {
  constructor(canvasWidth) {
    const data = itemData[Math.floor(Math.random() * itemData.length)];
    this.value = data.val;
    
    this.node = document.createElement("img");
    this.node.src = data.img;
    this.node.style.position = "absolute";
    this.node.style.width = "50px";
    this.node.style.height = "50px";
    this.node.style.zIndex = "50";

    this.width = 40;
    this.height = 40;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = -60;

    // ACCÉLÉRATION : On augmente la vitesse de base si le temps presse
    let speedBonus = 0;
    if (typeof timeLeft !== 'undefined') {
        if (timeLeft <= 60) speedBonus = 4;
        else if (timeLeft <= 120) speedBonus = 2;
    }
    this.speed = (3 + Math.random() * 2) + speedBonus;
  }

  update() {
    this.y += this.speed;
  }
}