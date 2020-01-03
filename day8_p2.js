
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
    for (let j = 0; j < 6; j++) {
        let line = "";
        for(let i = 0; i < 25; i++) {
            
            let currentChar = " ";

            for(let layer = 0; layer < 100; layer++) {
                let location = (j*25) + i + (layer * 150);
                let value = input.charAt(location);

                if(value === "1") {
                    currentChar = String.fromCharCode(9617);
                    
                    break;
                }

                if(value === "0") {
                    currentChar = " ";//String.fromCharCode(9619);

                    break;
                }
            }
            
            line += currentChar;
            
        }
        console.log(line);
    }
});