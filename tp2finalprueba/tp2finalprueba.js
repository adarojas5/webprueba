/*
COM3 
tpfinalparte2
Sofia Brizuela
Ada Rojas         

*/
let juego;

function setup() {
  createCanvas(640, 480);
  juego = new Juego(); //se inicia una innstancia del juego 
}

function draw() {
  background(6, 13, 52);
  juego.mostrar();
}
 
function mousePressed() {
    juego.verificarClick(mouseX, mouseY);  //para detectar clips del mouse llama a una funcion 
}
   
