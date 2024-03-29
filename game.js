const canvas = document.querySelector(".game");
const game = canvas.getContext("2d");
const buttonUp = document.querySelector(".up"); 
const buttonLeft = document.querySelector(".left"); 
const buttonRigth = document.querySelector(".rigth"); 
const buttonDown = document.querySelector(".down"); 
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = { x: undefined, y: undefined};
const giftPosition = { x: undefined, y: undefined};
let enemyPositions = [];

window.addEventListener("load", stratGame);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
    //Responsive con canvas 
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.7;
    } else {
      canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = Number(canvasSize.toFixed(0));
  
    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);
  
    //Tamanio de los elementos de dentro de canvas
    elementsSize = canvasSize / 10;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    stratGame();
}

function stratGame() {
  console.log({canvasSize, elementsSize});

  game.font = elementsSize + "px Verdana";
  game.textAlign = 'end';

  //construccion de los arrays multifuncionales
  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(ShowTime, 100);
    showRecord();
  }
  
  const mapRows = map.trim().split('\n');
  const mapRowsColumns = mapRows.map( row => row.trim().split(''));
  //console.log({map, mapRows, mapRowsColumns});
  showLives();

  enemyPositions = [];
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
      } else if(column == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY ;
      } else if (column == 'X') {
        enemyPositions.push({x: posX, y: posY});
      }
      game.fillText(emoji, posX, posY);
      // console.log({row, rowI, column, columnI});
    });
  });
  movePlayer();
} 

function movePlayer() {
  const giftColisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftColisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const gittColision = giftColisionX && giftColisionY;

  if (gittColision) {
    levelWin();
  }

  const enemyColision = enemyPositions.find( enemy => {
    const enemyColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyColisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyColisionX && enemyColisionY;
  });
  
  if (enemyColision) {
    levelFail();
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y );
  
}

function levelWin() {
  console.log('subiste de nivel');
  level++;
  stratGame();
}

function levelFail() {
  console.log('chocaste con alg XD');
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined; 
  }
  
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  stratGame();
}

function gameWin() {
  console.log("juego terminado");
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResult.innerHTML = "SUPERASTE LA MARCA";
    } else {
      pResult.innerHTML = "Intentalo de nuevo, supera tu limie";
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    pResult.innerHTML = "Buen inicio, Pero puedes hacerlo mejor"
  }
  console.log({recordTime, playerTimeS});
}

function showLives() {
  const heartArray = Array(lives).fill(emojis['HEART'])
  
  spanLives.innerHTML = "";
  heartArray.forEach( heart => spanLives.append(heart))

}

function ShowTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}
function showRecord() {
  spanRecord.innerHTML = localStorage.getItem('record_time');
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