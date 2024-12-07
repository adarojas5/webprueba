class Objeto {// representa a los objetos que caen 
  constructor() {
    this.x = random(0, width);
    this.y = 0;
    this.tam = 80;
    this.velocidad = random(2, 5);
    this.bueno = random(1) > 0.5; // 50% buenos, 50% malos
   
    //carga de imagen dependiendo su tipo
    if(!Objeto.imagenesBuenas) {
      Objeto.imagenesBuenas = [
      loadImage ("data/velasoscuras.png"),
      loadImage("data/pasteloscuro.png"), 
      loadImage("data/veneno.png"),
      loadImage("data/pianoviejo.png"),
      ];
    }
    if(!Objeto.imagenesMalas) {
       Objeto.imagenesMalas = [
       loadImage("data/pastelrosa.png"),
       loadImage("data/pianorosa.png"), 
       loadImage("data/velasclaras.png"),
       ];
    }


if (this.bueno) {
  this.imagen = random(Objeto.imagenesBuenas);
} else {
  this.imagen = random(Objeto.imagenesMalas);
}
  }




  mostrar() {//dibuja
    image (this.imagen, this.x, this.y, this.tam, this.tam);
  }

  mover() {
    this.y += this.velocidad;
  }

  toca(personaje) {//verifica si un objeto colisiona con el personaje 
    return (
      this.y + this.tam / 2 > personaje.y &&
      this.x > personaje.x &&
      this.x < personaje.x + personaje.tam
    );
  }

  fueraDePantalla() { //detecta si un objeto sale de pan
    return this.y > height;
  }
}
