
var inputData = require('./day2.json');

function runProgram(noun, verb, data) {
    let opCodeIndex = 0;
    data[1] = noun;
    data[2] = verb;

    while(true) {
        if(data[opCodeIndex] == 99) {
            //console.log("Index 0: ", data[0]);
            return data[0];
        }

        //add
        if(data[opCodeIndex] == 1) {
            let left = data[data[opCodeIndex + 1]];
            let right = data[data[opCodeIndex + 2]];

            data[data[opCodeIndex + 3]] = left + right;
        }

        //multiply
        if(data[opCodeIndex] == 2) {
            let left = data[data[opCodeIndex + 1]];
            let right = data[data[opCodeIndex + 2]];

            data[data[opCodeIndex + 3]] = left * right;
        }

        opCodeIndex += 4
    }
}

for(let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        if(runProgram(i, j, [...inputData]) == 19690720) {
            console.log("Noun: ", i, " Verb: ", j, "(100 * ", i, ") + ", j, " = ", (100 * i) + j);
            return;
        }
    }
}

console.log("Didn't find an answer");