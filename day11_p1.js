var intcode = require("./intcode");
var inputData = require('./day11.json');

let program = intcode.runProgram([...inputData], handleOutput)

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

let currentDirection = 0;
let currentX = 0;
let currentY = 0;

function changeDirection(direction) {
    if(direction === 0) {
        currentDirection--;
    }
    else {
        currentDirection++;
    }

    if(currentDirection < 0) { currentDirection = 3;}
    if(currentDirection > 3) { currentDirection = 0;}

}

function turn(input) {
    changeDirection(input);
    move(currentDirection);
    storeLocation();
}

function move(direction) {
    if(direction === UP) {
        currentY--;
    }

    if(direction === DOWN) {
        currentY++;
    }

    if(direction === LEFT) {
        currentX--;
    }

    if(direction === RIGHT) {
        currentX++;
    }
}

let visited = {};
let painted = {};
function storeLocation() {
    visited["X" + currentX + "Y" + currentY] = 1;
}

function paint(currentColor) {
    painted["X" + currentX + "Y" + currentY] = currentColor;
}

let count = 0;
//0 waiting for color
//1 waiting for new direction
let outputState = 0;
//let color = 0;
function handleOutput(output) {
    if(outputState === 0) {
        color = output;
        outputState = 1;
        paint(color);
    }
    else {
       
        outputState = 0;
        
        turn(output);

        pushNewInput();
    }
}

function pushNewInput() {
    let newInput = 0;

    if(painted["X" + currentX + "Y" + currentY]) { newInput = 1; }

    program.addInput(newInput);
}

program.programPromise
    .then(t => {
        let numVisited = Object.keys(painted).length;
        console.log("Done, visited ", numVisited, " locations");
        console.log("Total moves: ", count);
    });
    
program.addInput(1);
program.start();

////////////////// Day 11 - Part 2
var intcode = require("./intcode");
var inputData = require('./day11.json');

let program = intcode.runProgram([...inputData], handleOutput)

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

let currentDirection = 0;
let currentX = 0;
let currentY = 0;
let maxX = 0;
let maxY = 0;
let minX = 0;
let minY = 0;

function changeDirection(direction) {
    if(direction === 0) {
        currentDirection--;
    }
    else {
        currentDirection++;
    }

    if(currentDirection < 0) { currentDirection = 3;}
    if(currentDirection > 3) { currentDirection = 0;}

}

function turn(input) {
    changeDirection(input);
    move(currentDirection);
    storeLocation();
}

function move(direction) {
    if(direction === UP) {
        currentY--;
    }

    if(direction === DOWN) {
        currentY++;
    }

    if(direction === LEFT) {
        currentX--;
    }

    if(direction === RIGHT) {
        currentX++;
    }

    minX = Math.min(minX, currentX);
    maxX = Math.max(maxX, currentX);
    minY = Math.min(minY, currentY);
    maxY = Math.max(maxY, currentY);
}

let visited = {};
let painted = {};
function storeLocation() {
    visited["X" + currentX + "Y" + currentY] = 1;
}

function paint(currentColor) {
    painted["X" + currentX + "Y" + currentY] = currentColor;
}

let count = 0;
//0 waiting for color
//1 waiting for new direction
let outputState = 0;
//let color = 0;
function handleOutput(output) {
    if(outputState === 0) {
        color = output;
        outputState = 1;
        paint(color);
    }
    else {
       
        outputState = 0;
        
        turn(output);

        pushNewInput();
    }
}

function pushNewInput() {
    let newInput = 0;

    if(painted["X" + currentX + "Y" + currentY]) { newInput = 1; }

    program.addInput(newInput);
}

function printBoard() {
    for(let y = minY; y < maxY+1; y++) {
        let line = "";
        for(let x = minX; x < maxX; x++) {

            //String.fromCharCode(9617);
            //String.fromCharCode(9619);
            let char = painted["X" + x + "Y" + y] || 0;

            if(char === 0) {
                line = line += String.fromCharCode(9617);
            }
            else {
                line = line += String.fromCharCode(9619);
            }
            
        }

        console.log(line);
    }
}

program.programPromise
    .then(t => {
        let numVisited = Object.keys(painted).length;
        console.log("Done, visited ", numVisited, " locations");
        console.log("Total moves: ", count);
        printBoard();
    });
    
program.addInput(1);
program.start();
