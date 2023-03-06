const canvas = document.querySelector(".game");
const game = canvas.getContext("2d");
const buttonUp = document.querySelector(".up"); 
const buttonLeft = document.querySelector(".left"); 
const buttonRigth = document.querySelector(".rigth"); 
const buttonDown = document.querySelector(".down"); 

let canvasSize;
let elementsSize;
const playerPosition = { x: undefined, y: undefined};
const giftPosition = { x: undefined, y: undefined};

window.addEventListener("resize", setCanvasSize)
window.addEventListener("load", stratGame);

function setCanvasSize() {
    //Responsive con canvas 
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.7;
    } else {
      canvasSize = window.innerHeight * 0.7;
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

  //construccion de los arrays multifuncionales
  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowsColumns = mapRows.map( row => row.trim().split(''));
  console.log({map, mapRows, mapRowsColumns});

  game.clearRect(0, 0, canvasSize, canvasSize);
  // Render de los elementos
  mapRowsColumns.forEach((row, rowI) => {
    row.forEach((column, columnI) => {
      const emoji = emojis[column];
      const posX = elementsSize * (columnI + 1);
      const posY = elementsSize * (rowI + 1);
      game.fillText(emoji, posX, posY);

      if (column == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({playerPosition});
        }
      } else if(column == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY ;
      }

      console.log({row, rowI, column, columnI});
    });
  });
  movePlayer();
} 

function movePlayer() {
  const giftColisionX = playerPosition.x == giftPosition.x;
  const giftColisionY = playerPosition.y == giftPosition.y;
  const gittColision = giftColisionX && giftColisionY;

  if (gittColision) {
    console.log("siguente nivel");
  }
  
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y );
  
}

window.addEventListener('keydown', moveByKeys);
buttonUp.addEventListener("click", moveUp);
buttonLeft.addEventListener("click", moveLeft);
buttonRigth.addEventListener("click", moveRigth);
buttonDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRigth();
  else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
  console.log("hacia arrba");
  if ((playerPosition.y - elementsSize) < elementsSize) {
    console.log("out");
  } else {
    playerPosition.y -= elementsSize;
    stratGame();
  }
}

function moveLeft() {
  console.log("hacia izquierda");
  if ((playerPosition.x - elementsSize) < elementsSize) {
    console.log("out");
  } else {
  playerPosition.x -= elementsSize;
  stratGame();
  }
}

function moveRigth() {
  console.log("hacia derecha");
  if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log("out");
  } else {
  playerPosition.x += elementsSize;
  stratGame();
  }
}

function moveDown() {
  console.log("hacia abajo");
  if ((playerPosition.y + elementsSize) > canvasSize) {
    console.log("out");
  } else {
  playerPosition.y += elementsSize;
  stratGame();
  }
}