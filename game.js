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

  const map = maps[1];
  const mapRows = map.trim().split('\n');
  const mapColumns = mapRows.map( row => row.trim().split(''));
  console.log({map, mapRows, mapColumns});

  for (let indexRow = 1; indexRow <= 10; indexRow++) {
    for (let indexColumn = 1; indexColumn <= 10; indexColumn++) {
    
      game.fillText(emojis[mapColumns[indexRow - 1][indexColumn - 1]], elementsSize * indexColumn, elementsSize * indexRow);
      
    }
  }
}
