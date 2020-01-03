
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('day1_p1'),
    output: process.stdout,
    console: false
});

var lines = [];
var result = 0;

readInterface.on('line', function(line) {
    var lineNumber = Number.parseInt(line);
    var mass = (Math.floor(lineNumber / 3) - 2);
    result += mass + calculateFuel(0, val);
});

readInterface.on('close', () => {
    console.log("Final result: ", result);
});

function calculateFuel(currentVal, fuelMass) {
    var calc = (Math.floor(fuelMass / 3) - 2);

    if(calc <= 0) { return currentVal; }

    if(calc > 0) {
        return calculateFuel(currentVal + calc, calc)
    }
}