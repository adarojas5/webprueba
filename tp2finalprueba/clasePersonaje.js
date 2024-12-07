class Personaje {// nuestro personaje controlado por el jugador 
  constructor() {
    this.x = width / 2;//posicion inicial
    this.y = height - 70;
    this.tam = 80;
    this.image = loadImage ("data/gusano.png");

  }

  mostrar() {//dibuja al personaje
    image (this.image, this.x, this.y, this.tam, this.tam);
  
  }

  mover() {//dependiendo de las teclas mueve al personaje 
      if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    this.x = constrain(this.x, 0, width - this.tam);
  }
}
