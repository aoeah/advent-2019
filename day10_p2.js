
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
        board[location] =  {x: Number.parseFloat(charIndex), y: Number.parseFloat(lineNumber), isAsteroid: isAsteroid };
        //        board[location] = (board[location] || []).push({x: Number.parseFloat(charIndex) + 1, y: Number.parseFloat(lineNumber) + 1, isAsteroid: isAsteroid });

    }

    lineNumber++;
});

////37 , y:  25
readInterface.on('close', () => {
    let max = Number.MIN_VALUE;
    let maxPoint = null;

    let answerBoard = {};
    for(let prop in board) {
        let outerItem = board[prop];
        if(outerItem.x === 37 && outerItem.y === 25) { continue; }
        if(!outerItem.isAsteroid) {continue;}

        let slope = (25 - outerItem.y) / (37 - outerItem.x);
        let quadrant = getQuadrant(outerItem, {x: 37, y: 25});
        let distance = Math.sqrt(Math.pow(outerItem.y - 25,2) + Math.pow(outerItem.x - 37,2))

        if(!answerBoard[quadrant + slope]) { answerBoard[quadrant + slope] = []};
        answerBoard[quadrant + slope].push({point: outerItem, distance: distance});
    }

    let slopes = Object.keys(answerBoard);

    slopes.sort(slopeSort).reverse();

    console.log("Answer: x: ", answerBoard[slopes[199]].x, " y: ", answerBoard[slopes[199]].y, " - ", answerBoard[slopes[199]].x * 1000 + answerBoard[slopes[199]].y)
});

function slopeSort(a, b) {
    let aSlope = Number.parseFloat(a.substring(1));
    let bSlope = Number.parseFloat(b.substring(1));

    let aQuadrant = a.substring(0, 1);
    let bQuadrant = b.substring(0, 1);

    if(bSlope === Number.NEGATIVE_INFINITY) { return 1;}
//neg inf, neg a,  pos a, neg b, pos b
    //A Quadrant is higher
    if(aQuadrant !== bQuadrant) {
        if(aQuadrant === "A") {
            return 1;
        }
        else {
            return -1;
        }
    }

    //now we assume they are in the same quadrant
    if(aQuadrant === "A") {
        return bSlope - aSlope;
    }
    else {
        return bSlope - aSlope;
    }
}

function getQuadrant(point, relativePoint) {
    relativePoint = relativePoint || {x:0,y:0};

    let x = point.x - relativePoint.x;
    let y = point.y - relativePoint.y;

    if(x > 0 || (x === 0)) { return "A"; }

    return "B";
}
