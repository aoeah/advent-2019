
var inputData = require('./day5.json');
//var inputData = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
//    1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
//    999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];

function runProgram(input, data) {
    let opCodeIndex = 0;
    // data[1] = noun;
    // data[2] = verb;

    while(true) {
        var rawOpCode = data[opCodeIndex];
        var opcode = parseOpCode(data[opCodeIndex]);

        if(opcode == 99) {
            //console.log("Index 0: ", data[0]);
            return data[0];
        }

        //add - 3 params
        if(opcode == 1) {
            //opCode, paramCount, index, data, currentOpCodeIndex
            let left = getParam(rawOpCode, 3, 0, data, opCodeIndex); //data[data[opCodeIndex + 1]];
            let right = getParam(rawOpCode, 3, 1, data, opCodeIndex);

            data[data[opCodeIndex + 3]] = left.value + right.value;
            opCodeIndex += 4
        }

        //multiply - 3 params
        if(opcode == 2) {
            let left = getParam(rawOpCode, 3, 0, data, opCodeIndex); //data[data[opCodeIndex + 1]];
            let right = getParam(rawOpCode, 3, 1, data, opCodeIndex);

            data[data[opCodeIndex + 3]] = left.value * right.value;
            opCodeIndex += 4
        }

        if(opcode == 3) {
            let location = data[opCodeIndex + 1];
            data[location] = input;
            
            opCodeIndex += 2
        }

        if(opcode == 4) {
            let location = getParam(rawOpCode, 1, 0, data, opCodeIndex);
            if(location.type === "1") { console.log("Output: ", location.value); }
            if(location.type === "0") { console.log("Output: ", location.value); }
            opCodeIndex += 2
        }

        if(opcode == 5) {
            let expression = getParam(rawOpCode, 2, 0, data, opCodeIndex);
            let location = getParam(rawOpCode, 2, 1, data, opCodeIndex);

            if(expression.value !== 0) {
                opCodeIndex = location.value;
            }
            else {
                opCodeIndex += 3
            }
        }

        if(opcode == 6) {
            let expression = getParam(rawOpCode, 2, 0, data, opCodeIndex);
            let location = getParam(rawOpCode, 2, 1, data, opCodeIndex);

            if(expression.value === 0) {
                opCodeIndex = location.value;
            }
            else {
                opCodeIndex += 3;
            }
        }

        if(opcode == 7) {
            let left = getParam(rawOpCode, 3, 0, data, opCodeIndex);
            let right = getParam(rawOpCode, 3, 1, data, opCodeIndex);
            let location = getParam(rawOpCode, 3, 2, data, opCodeIndex);

            if(left.value < right.value) {
                data[data[opCodeIndex + 3]] = 1;
            }
            else {
                data[data[opCodeIndex + 3]] = 0;
            }

            opCodeIndex += 4;
        }

        if(opcode == 8) {
            let left = getParam(rawOpCode, 3, 0, data, opCodeIndex);
            let right = getParam(rawOpCode, 3, 1, data, opCodeIndex);
            let location = getParam(rawOpCode, 3, 2, data, opCodeIndex);

            if(left.value === right.value) {
                data[data[opCodeIndex + 3]] = 1;
            }
            else {
                data[data[opCodeIndex + 3]] = 0;
            }

            opCodeIndex += 4;
        }
    }
}

function parseOpCode(code) {
    return Number.parseInt(code.toString().padStart(2, "0").slice(-2));
}

function getParam(opCode, paramCount, index, data, currentOpCodeIndex) {
    var type = opCode.toString().padStart(paramCount+2, "0").slice(paramCount - 1 - index, paramCount - index);
    var value = null;
    if(type === "0") {
        value = data[data[currentOpCodeIndex + 1 + index]];
    }
    else if(type ===("1")) {
        value = data[currentOpCodeIndex + 1 + index];
    }

    return {
        type: type,
        value: value
    }
}
runProgram(5, [...inputData]);


console.log("Didn't find an answer");