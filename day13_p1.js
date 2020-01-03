var intcode = require("./intcode");
var inputData = require('./day13.json');

let tileCount = 0;
let outputState = 0;
function outputCallback(output) {
    if(outputState === 0) {
        /// x value
    }

    if(outputState === 1) {
        /// y value
    }

    if(outputState === 2) {
        ///tile type
        if(output === 2)  {tileCount++};

        
    }

    outputState++;
    outputState = outputState % 3;
}

let program = intcode.runProgram([...inputData], outputCallback)


program.programPromise
    .then(t => {
        console.log("Tile count: ", tileCount);
    });
    
 program.start();

///////////////////////////////////// day 13 - 1
var intcode = require("./intcode");
var inputData = require('./day13.json');


let tileCount = 0;
let outputState = 0;

let maxX = 0;
let maxY = 0;

let newX = 0;
let newY = 0;
function outputCallback(output) {
    if(outputState === 0) {
        /// x value
        newX = 0;
        maxX = Math.max(maxX, output);
    }

    if(outputState === 1) {
        /// y value
        //newY = 
        maxY = Math.max(mathY, output);
    }

    if(outputState === 2) {
        ///tile type
        if(output === 2)  {tileCount++};

        
    }

    console.log(output);

    outputState++;
    outputState = outputState % 3;
}

function storeLocation() {
    visited["X" + currentX + "Y" + currentY] = 1;
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

let program = intcode.runProgram([...inputData], outputCallback)


program.programPromise
    .then(t => {
        console.log("Tile count: ", tileCount);
    });
 

 program.start();

 setTimeout(() => {console.log("SENDING COMMAND"); program.addInput(-1);}, 10000);

