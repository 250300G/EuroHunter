const element = [
  { img: loadImg("./car.png"),     name: "Voiture",    value: -500 },
  { img: loadImg("./house.png"),   name: "Maison",     value: -800 },
  { img: loadImg("./cycling.png"), name: "Vélo",       value: +200 },
  { img: loadImg("./phone.png"),   name: "Téléphone",  value: -150 },
];
class ChuteElement {
  constructor(canvasWidth) {
    // Tirage aléatoire dans le tableau
    const type = element[Math.floor(Math.random() * element.length)];
    
    this.label  = type.label;
    this.value  = type.value;   // positif = économie, négatif = dépense
    this.x      = Math.random() * (canvasWidth - 40) + 20; // position X aléatoire
    this.y      = -20;          // démarre hors écran en haut
    this.speed  = 1.5 + Math.random() * 2; // vitesse variable
    this.radius = 22;
  }

  
}