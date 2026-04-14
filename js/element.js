 
function loadImg(src) {
  const img = new Image();
  img.src = src;
  return img;
}
 
const elements = [
  { img: loadImg("./images/car.png"),     name: "Voiture",   value: -500 },
  { img: loadImg("./images/house.png"),   name: "Maison",    value: -800 },
  { img: loadImg("./images/cycling.png"), name: "Vélo",      value: +200 },
  { img: loadImg("./images/phone.png"),   name: "Téléphone", value: -150 },
];

class ChuteElement {
  constructor(canvasWidth) {
 
    const type = elements[Math.floor(Math.random() * elements.length)];

    this.name   = type.name;
    this.value  = type.value;
    this.img    = type.img;
    this.x      = Math.random() * (canvasWidth - 40) + 20;
    this.y      = -20;
    this.speed  = 1.5 + Math.random() * 2;
    this.radius = 22;

 
    this.width  = 40;
    this.height = 40;
  }

  update() {
    this.y += this.speed;
  }

 
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

}

let fallingElements = [];