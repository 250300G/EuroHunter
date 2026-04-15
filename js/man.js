class Man {
  constructor() {
    // 1. CRÉATION DU NŒUD
    this.node = document.createElement("img");
    this.node.src = "./images/man.png";
    
    // 2. CONFIGURATION DU STYLE (Indispensable pour l'affichage)
    this.node.style.position = "absolute";
    this.node.style.zIndex = "10"; // On s'assure qu'il est au-dessus du décor
    
    // 3. ATTACHEMENT AU JEU
    // On l'ajoute immédiatement à la boîte de jeu
    gameBoxNode.append(this.node);
    
    // 4. DIMENSIONS ET POSITION INITIALE
    this.width = 40;
    this.height = 35;
    this.x = 300; // Position horizontale de départ
    this.y = 350; // Position verticale de départ
    this.speed = 5; // Vitesse de déplacement
    
    // 5. APPLICATION INITIALE DES STYLES
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.updatePosition();
  }

  // VERDISSAGE : Méthode pour déplacer le personnage
  // Elle reçoit l'objet 'keysPressed' de main.js
  move(keysPressed) {
    // Vers le Haut
    if (keysPressed["ArrowUp"] && this.y > 0) {
      this.y -= this.speed;
    }
    // Vers le Bas (on limite à la hauteur du gameBox)
    if (keysPressed["ArrowDown"] && this.y < gameBoxNode.offsetHeight - this.height) {
      this.y += this.speed;
    }
    // Vers la Gauche
    if (keysPressed["ArrowLeft"] && this.x > 0) {
      this.x -= this.speed;
    }
    // Vers la Droite (on limite à la largeur du gameBox)
    if (keysPressed["ArrowRight"] && this.x < gameBoxNode.offsetWidth - this.width) {
      this.x += this.speed;
    }

    // Une fois les calculs faits, on met à jour le visuel
    this.updatePosition();
  }

  // Fonction interne pour appliquer les coordonnées au style CSS
  updatePosition() {
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }
}