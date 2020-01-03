const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('day3.txt'),
    output: process.stdout,
    console: false
});

var lines = [];

readInterface.on('line', function(line) {
    lines.push(line.split(","));
});

readInterface.on('close', () => {
    var board1 = buildBoard(lines[0]);
    var board2 = buildBoard(lines[1]);

    var min = 999999;

    for(let prop in board2) {
        if(board1[prop]) {
            if(board1[prop] < min) {
                min = board1[prop];
            }
        }
    }

    console.log("Minimum: ", min)
});

function buildBoard(line) {
    let board = {};
    let currentX = 0;
    let currentY = 0;
    for (let index = 0; index < line.length; index++) {
        const element = line[index];
        
        var direction = element.charAt(0);
        var distance = Number.parseInt(element.slice(1));

        if(direction === 'U') {
            for(let i = 0; i < distance; i++) {
                currentY++;
                addToBoard(currentX, currentY, board);
            }
        }

        if(direction === "D") {
            for(let i = 0; i < distance; i++) {
                currentY--;
                addToBoard(currentX, currentY, board);
            }
        }

        if (direction === "L") {
            for(let i = 0; i < distance; i++) {
                currentX--;
                addToBoard(currentX, currentY, board);
            }
        }

        if (direction === "R") {
            for(let i = 0; i < distance; i++) {
                currentX++;
                addToBoard(currentX, currentY, board);
            }
        }
    }

    return board;
}

function addToBoard(x, y, board) {
    board["X"+x+"Y"+y] = Math.abs(x)+Math.abs(y);
}