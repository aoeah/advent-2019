
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('day10.txt'),
    output: process.stdout,
    console: false
});

var board = {};
let lineNumber = 0;

readInterface.on('line', function(line) {

    for(let charIndex in line) {
        let char = line.charAt(charIndex);
        let location = (Number.parseInt(lineNumber)).toString() + "," + (Number.parseInt(charIndex)).toString();
        let isAsteroid = char === "#"; 
        board[location] = {x: Number.parseFloat(charIndex), y: Number.parseFloat(lineNumber), isAsteroid: isAsteroid };
    }

    lineNumber++;
});

readInterface.on('close', () => {
    let max = Number.MIN_VALUE;
    let maxPoint = null;

    for(let prop in board) {
        let outerItem = board[prop];
        let answerBoard = {};

        if(!outerItem.isAsteroid) {continue;}

        for(let innerProp in board) {
            if(prop === innerProp) {continue; }

            let innerItem = board[innerProp];

            if(!innerItem.isAsteroid) {continue; }

            let slope = (innerItem.y - outerItem.y) / (innerItem.x - outerItem.x);
            answerBoard[getQuadrant(innerItem, outerItem) + slope] = 1;
        }

        let currentCount = Object.keys(answerBoard).length;
        if(currentCount > max) {
            max = currentCount;
            maxPoint = outerItem;
        }
    }

    console.log("Max point: x: ", maxPoint.x, ", y: ", maxPoint.y, " - Asteroids: ", max);
});

function getQuadrant(point, relativePoint) {
    relativePoint = relativePoint || {x:0,y:0};

    let x = point.x - relativePoint.x;
    let y = point.y - relativePoint.y;

    if(x > 0) { return "A"; }

    return "B";
}

48,41
46,3

