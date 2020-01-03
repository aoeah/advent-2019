
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('day8'),
    output: process.stdout,
    console: false
});

var input = "";
let batchSize = 150;

readInterface.on('line', function(line) {
    input = line;
});

readInterface.on('close', () => {
    let board = {};
    for(let i = 0; i < input.length; i++) {
        let val = input.charAt(i);
        let boardNum = (Math.floor((i) / 150));
        if(typeof(board[boardNum]) === "undefined") { board[boardNum] = { Val1: 0, Val2: 0, Val0: 0}; };

        if(val === "1") {
            board[boardNum].Val1++;
        }

        if(val === "0") {
            board[boardNum].Val0++;
        }

        if(val === "2") {
            board[boardNum].Val2++;
        }
    }

    let boardCount = input.length / 150;
    let minBoard = Number.MAX_VALUE;
    let minVal = Number.MAX_VALUE;
    for(let j = 0; j < boardCount; j++) {
        if(board[j].Val0 < minVal) {
            minVal = board[j].Val0;
            minBoard = j;
        }
    }

    console.log("Minboard: ", minBoard, " 1 * 2 - ", board[minBoard].Val1 * board[minBoard].Val2);
});