class Boton {//atributos
  constructor(x, y, ancho, alto, texto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;
  }

  mostrar() {//dibuja
    fill(100, 200, 100);
    rect(this.x, this.y, this.ancho, this.alto, 5);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
  }

  estaSobre(mx, my) {// verifica si el mouse esta sobre 
    return mx > this.x && mx < this.x + this.ancho && my > this.y && my < this.y + this.alto;
  }
}

class BotonSonido extends Boton {//extencion y funcionalidad para el sonido
  constructor(x, y, ancho, alto, texto) {
    super(x, y, ancho, alto, texto);
    this.sonido = loadSound("data/bosque1.mp3"); // Ruta del archivo de sonido
    this.reproduciendo = false; 
  }

  toggleSonido() {// cambia el estado del sonido 
    if (this.reproduciendo) {
      this.sonido.stop();
      this.texto = "Play";
    } else {
      this.sonido.loop();
      this.texto = "Stop";
    }
    this.reproduciendo = !this.reproduciendo;
  }
  verificarClick(mx, my) {// verifica   
    if (this.estaSobre(mx, my)) {
      this.toggleSonido();  
    }  
  }
}    
