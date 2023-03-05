const canvas = document.querySelector(".game");
const game = canvas.getContext("2d");

let canvasSize;
let elementsSize;

window.addEventListener("resize", setCanvasSize)
window.addEventListener("load", stratGame);

function setCanvasSize() {
    //Responsive con canvas 
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.8;
    } else {
      canvasSize = window.innerHeight * 0.8;
    }
  
    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);
  
    //Tamanio de los elementos de dentro de canvas
    elementsSize = canvasSize / 10;
    stratGame();
}

function stratGame() {
  console.log({canvasSize, elementsSize});

  game.font = elementsSize + "px Verdana";
  game.textAlign = 'end';

  for (let index = 1; index <= 10; index++) {
    game.fillText(emojis["X"], elementsSize, elementsSize * index);
  }
}
