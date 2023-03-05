const canvas = document.querySelector(".game");
const game = canvas.getContext("2d");

window.addEventListener("load", stratGame);

function stratGame() {
  //Responsive con canvas 
  let canvasSize;
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  //Tamanio de los elementos de dentro de canvas
  const elementsSize = canvasSize / 10;
  console.log({canvasSize, elementsSize});

  game.font = elementsSize + "px Verdana";
  game.textAlign = 'end';

  for (let index = 1; index <= 10; index++) {
    game.fillText(emojis["X"], elementsSize, elementsSize * index);
  }
  // game.fillRect(0,0,100,100);
  // game.clearRect(0,0,50,50);
  // game.clearRect(50,50,100,100);

  // game.font = "25px Verdana";
  // game.fillStyle = "white";
  // game.textAlign = "center";
  // game.fillText("oscar", 50,50)
}