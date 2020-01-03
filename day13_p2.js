var intcode = require("./intcode");
var inputData = require('./day13.json');
var blessed = require("blessed");
//var keypress = require("keypress");


let tileCount = 0;
let outputState = 0;

let maxX = 0;
let maxY = 0;

let newX = 0;
let newY = 0;
function outputCallback(output) {
    if(outputState === 0) {
        /// x value
        newX = output;
        maxX = Math.max(maxX, output);
    }

    if(outputState === 1) {
        /// y value
        newY = output;
        maxY = Math.max(maxY, output);
    }

    if(outputState === 2) {
        if(newX === -1 && newY === 0) {
            console.log("Current Score: ", output);
        }
        else {
            printTile(output, newX, newY);
        }

        newX = 0;
        newY = 0;
    }

    // console.log(output);

    outputState++;
    outputState = outputState % 3;
}

function printTile(tile, x, y) {
        /*
0 is an empty tile. No game object appears in this tile.
1 is a wall tile. Walls are indestructible barriers.
2 is a block tile. Blocks can be broken by the ball.
3 is a horizontal paddle tile. The paddle is indestructible.
4 is a ball tile. The ball moves diagonally and bounces off objects.
        */
        // switch(tile) {
        //     case 0:
        //             axel.bg(0,0,0);
        //             axel.point(x, y);
                    
        //         break;
        //     case 1:
        //             axel.bg(255,255,255);
        //             axel.point(x, y);
        //         break;

        //     case 2:
        //             axel.bg(255,255,255);
        //             axel.point(x, y);
        //         break;
        //     case 3:
        //             axel.bg(255,255,255);
        //             axel.point(x, y);
        //         break;
        //     case 4:
        //             axel.bg(255,255,255);
        //             axel.point(x, y);
        //         break;
        // }
        color = "green";
        if(tile === 0) {
            color = "white";
        }
        draw({x: x, y: y}, color);
}

function storeLocation() {
    visited["X" + currentX + "Y" + currentY] = 1;
}

function createGameBox() {
    return {
      parent: screen,
      top: 1,
      left: 0,
      width: '100%',
      height: '100%-1',
      style: {
        fg: 'black',
        bg: 'black',
      },
    }
  }

  
function createScoreBox() {
    return {
      parent: screen,
      top: 1,
      left: 0,
      width: '100%',
      height: '1',
      style: {
        fg: 'blue',
        bg: 'blue',
      },
    }
  }

  // Draw a pixel
  function draw(coord, color) {
    blessed.box({
      parent: gameContainer,
      top: coord.y,
      left: coord.x,
      width: 1,
      height: 1,
      style: {
        fg: color,
        bg: color,
      },
    });

    render();
  }

  function render() {
    screen.render()
  }

  const LEFT = 1;
const RIGHT = 2;
const NONE = 0;

function makeMove(direction) {
    
    if(direction === LEFT) {
        //console.log('moving left');
        program.addInput(-1);
    }

    if(direction === RIGHT) {
        //console.log("moving right");
        program.addInput(1);
    }

    if(direction === NONE) {
        //console.log("not moving");
        program.addInput(0);
    }
}

  function bindHandlers() {
    // Event to handle keypress i/o
    // screen.on('keypress', keyPressHandler)
    // screen.key(['escape', 'q', 'C-c'], quitHandler)
    // screen.key(['enter'], enterHandler)

 
    screen.key(['escape'], ()=> process.exit(0));
    screen.key(['a'], () => makeMove(LEFT));
    screen.key(['d'], () => makeMove(RIGHT));
    screen.key(['s'], () => makeMove(NONE));

  }
  
  var screen;
  var gameBox;
  var gameContainer;
  //var scoreContainer;

  function setupGame() {
       // Blessed is the terminal library API that provides a screen, elements, and
    // event handling
    screen = blessed.screen()

    // Game title
    screen.title = 'hi'

    // Create the boxes
    gameBox = createGameBox()
    scoreBox = createScoreBox()
    
    gameContainer = blessed.box(gameBox);
    scoreContainer = blessed.box(scoreBox)
  }
// function printBoard() {
//     for(let y = minY; y < maxY+1; y++) {
//         let line = "";
//         for(let x = minX; x < maxX; x++) {

//             //String.fromCharCode(9617);
//             //String.fromCharCode(9619);
//             let char = painted["X" + x + "Y" + y] || 0;

//             if(char === 0) {
//                 line = line += String.fromCharCode(9617);
//             }
//             else {
//                 line = line += String.fromCharCode(9619);
//             }
            
//         }

//         console.log(line);
//     }
// }

inputData[0] = 2;

let program = intcode.runProgram([...inputData], outputCallback)

program.programPromise
    .then(t => {
        console.log("Tile count: ", tileCount);
    });
 

    setupGame();
    bindHandlers();
 program.start();


 process.stdin.setRawMode(true);
 keypress(process.stdin);
 process.stdin.resume();
