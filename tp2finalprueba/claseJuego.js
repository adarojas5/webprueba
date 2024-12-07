
class Juego {
  constructor() {//atributos principales
    this.estado = "inicio"; // Puede ser 'inicio', 'jugando', 'fin', 'ganaste' o 'creditos' determina en que pantalla esta 
    this.personaje = new Personaje();
    this.objetos = [];
    this.vidas = 3;
    this.puntaje = 0;
    this.tiempo = 30; // Temporizador en segundos
    this.tiempoInicio = 0;
    this.botonInicio = new Boton(width / 2 - 50, height / 2 + 30, 100, 40, "Jugar");
    this.botonCreditos = new Boton(width / 2 - 50, height / 2 + 80, 100, 40, "Créditos");
    this.botonReiniciar = new Boton(width / 2 - 50, height / 2 + 40, 100, 40, "Reiniciar");
    this.botonVolver = new Boton(width / 2 - 50, height - 60, 100, 40, "Volver");
    this.botonInicioDesdeFin = new Boton(width / 2 - 50, height / 2 + 90, 100, 40, "Inicio");

    this.imagenInicio = loadImage("data/fondotres.jpg");
    this.imagenCreditos = loadImage("data/fondodos.jpg");
    this.imagenFin = loadImage("data/fondouno.jpg");
    this.imagenGanaste = loadImage("data/fondouno.jpg");
    this.imagenjugar = loadImage("data/fondouno.jpg");
        this.botonSonido = new BotonSonido(width - 120, height - 60, 100, 40, "Play");
  
  }

  iniciar() {// restablece las variables del juego
    this.estado = "jugando";
    this.vidas = 3;
    this.puntaje = 0;
    this.objetos = [];
    this.tiempoInicio = millis(); // Guardamos el tiempo de inicio
  }

  mostrar() {//llama a metodos especificos dependienddo del estado del juego
    if (this.estado === "inicio") {
      this.pantallaInicio();
    } else if (this.estado === "jugando") {
      this.jugar();
    } else if (this.estado === "fin") {
      this.pantallaFin();
    } else if (this.estado === "ganaste") {
      this.pantallaGanaste();
    } else if (this.estado === "creditos") {
      this.pantallaCreditos();
    }
  }

verificarClick(mx, my) {
  if (this.estado === "inicio") {
    if (this.botonInicio.estaSobre(mx, my)) {
      this.iniciar();
    } else if (this.botonCreditos.estaSobre(mx, my)) {
      this.estado = "creditos";
    }
  } else if (this.estado === "fin" || this.estado === "ganaste") {
    if (this.botonReiniciar.estaSobre(mx, my)) {
      this.iniciar();
    } else if (this.botonInicioDesdeFin.estaSobre(mx, my)) {
      this.estado = "inicio";
    }
  } else if (this.estado === "creditos" && this.botonVolver.estaSobre(mx, my)) {
    this.estado = "inicio";
  }

  // Verificar clic en el botón de sonido
  this.botonSonido.verificarClick(mx, my);
}


  pantallaInicio() {//instrucciones y botones 
    image(this.imagenInicio, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(200);
    text ("¡Eres el Gusano, tu tarea es organizar la perfecta boda para Emily!", width / 2, height / 2 - 120);
    text("\n Instrucciones:\n \n Muevete con las flechas y atrapa la mayor cantidad\n de objetos oscuros antes de que se acabe el tiempo\n ¡Cuidado! Si atrapas un objeto claro, perderás una vida.", width / 2, height / 2 - 80);
    this.botonInicio.mostrar();
    this.botonCreditos.mostrar();
     this.botonSonido.mostrar();
 
  }

  pantallaCreditos() {
    image(this.imagenCreditos, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(200);
    text("Juego creado por Sofía Brizuela y Ada Rojas.", width/ 2, height / 2 - 40);
    this.botonVolver.mostrar();
  }

  jugar() {//nucleo de juego. 
    image(this.imagenjugar, 0, 0, width, height);
    this.personaje.mostrar();
    this.personaje.mover();

    // Crear objetos periódicamente
    
    if (frameCount % 60 === 0) {
      this.objetos.push(new Objeto());
    }

    // Mostrar y mover objetos
    for (let i = this.objetos.length - 1; i >= 0; i--) {
      this.objetos[i].mostrar();
      this.objetos[i].mover();

      // Verificar colisiones
      if (this.objetos[i].toca(this.personaje)) {
        if (this.objetos[i].bueno) {
          this.puntaje++;
        } else {
          this.vidas--;
        }
        this.objetos.splice(i, 1);
      } else if (this.objetos[i].fueraDePantalla()) {
        this.objetos.splice(i, 1);
      }
      }

    // Mostrar puntaje, vidas y tiempo restante
    let tiempoRestante = this.tiempo - int((millis() - this.tiempoInicio) / 1000);
    fill(200);
    textSize(16);
    text(`Puntaje: ${this.puntaje}`, 50, 20);
    text(`Vidas: ${this.vidas}`, width - 50, 20);
    text(`Tiempo: ${tiempoRestante}s`, width / 2, 20);

    // Verificar si pierde o gana
    if (this.vidas <= 0) {
      this.estado = "fin";
    } else if (tiempoRestante <= 0) {
      this.estado = "ganaste";
    }
  }
// muestran las pantallas dependiendo del resultado
  pantallaFin() {
    image(this.imagenFin, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(200);
    text(`Perdiste. Puntaje: ${this.puntaje}`, width / 2, height / 2 - 20);
    this.botonReiniciar.mostrar();
    this.botonInicioDesdeFin.mostrar();
  }

  pantallaGanaste() {
    image(this.imagenGanaste, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(200);
    text(`¡Ganaste! Puntaje: ${this.puntaje}`, width / 2, height / 2 - 20);
    this.botonReiniciar.mostrar();
    this.botonInicioDesdeFin.mostrar();
  }
}
