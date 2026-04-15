function loadImg(src) {
  const img = new Image();
  img.src = src;
  return img;
}

const elements = [
    { img: loadImg("./images/travelling.png"),name: "travelling", value: -250 },
  { img: loadImg("./images/car.png"),    name: "Voiture",   value: -200 },
  { img: loadImg("./images/house.png"),   name: "Maison",    value: -600 },
  { img: loadImg("./images/phone.png"),   name: "Téléphone", value: -150 },
  { img: loadImg("./images/cooking-home.png"),   name: "cooking-home", value: +150 },
  { img: loadImg("./images/planning.png"),name: "planning", value: +100 },
  { img: loadImg("./images/cooking.png"), name: "cooking", value: +100 },
  { img: loadImg("./images/saving.png"), name: "saving", value: +100},
  { img: loadImg("./images/forest-walk.png"), name: "forest-walk", value: +150 },
  { img: loadImg("./images/working2.png"), name: "working2", value: +450 },
  { img: loadImg("./images/saving.png"), name: "Téléphone", value: +350 },
  { img: loadImg("./images/cycling.png"), name: "Vélo",      value: +200 },

];

class ChuteElement {
  constructor(canvasWidth) {
    // 1. Sélection aléatoire du type d'élément
    const type = elements[Math.floor(Math.random() * elements.length)];

    this.name   = type.name;
    this.value  = type.value;
    this.img    = type.img;
    
    // 2. CRÉATION DU NŒUD DOM  
    this.node = document.createElement("img");
    this.node.src = this.img.src;
    this.node.style.position = "absolute";
    this.node.style.width = "40px";
    this.node.style.height = "40px";

    // 3. POSITIONNEMENT INITIAL
    // On calcule un X aléatoire pour qu'il n'apparaisse pas toujours au même endroit
    this.x      = Math.random() * (canvasWidth - 40) + 20;
    this.y      = -40; // On le fait partir un peu plus haut pour une entrée fluide
    this.speed  = 2 + Math.random() * 2;
    
    this.width  = 40;
    this.height = 40;
  }

  // Mise à jour de la donnée de position
  update() {
    this.y += this.speed;
  }

 
}

 