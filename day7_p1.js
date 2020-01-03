var inputData = require('./day7.json');
//var inputData = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
//    1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
//    999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];

function runProgram(data) {
    let opCodeIndex = 0;
    var outputCode = Number.NaN;
    var inputIndex = 1;

    while(true) {
        var rawOpCode = data[opCodeIndex];
        var opcode = parseOpCode(data[opCodeIndex]);

        if(opcode == 99) {
            return outputCode;
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

        //input
        if(opcode == 3) {
            let location = data[opCodeIndex + 1];
            data[location] = arguments[inputIndex];
            inputIndex++;
            opCodeIndex += 2
        }

        //output
        if(opcode == 4) {
            let location = getParam(rawOpCode, 1, 0, data, opCodeIndex);
            if(location.type === "1") { console.log("Output: ", location.value); }
            if(location.type === "0") { console.log("Output: ", location.value); }

            outputCode = location.value;
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

let results = [];
function heapPermutation(a, size, n) 
    { 
        // if size becomes 1 then prints the obtained 
        // permutation 
        if (size === 1) 
            results.push([...a]);
   
        for (let i=0; i<size; i++) 
        { 
            heapPermutation(a, size-1, n); 
   
            // if size is odd, swap first and last 
            // element 
            if (size % 2 == 1) 
            { 
                let temp = a[0]; 
                a[0] = a[size-1]; 
                a[size-1] = temp; 
            } 
   
            // If size is even, swap ith and last 
            // element 
            else
            { 
                let temp = a[i]; 
                a[i] = a[size-1]; 
                a[size-1] = temp; 
            } 
        } 
    } 

heapPermutation([0,1,2,3,4], 5, 5);

var max = Number.MIN_VALUE;
var perm = [];

for (let t in results) {
    let vals = results[t];
    
    let finalResult = runProgram([...inputData], vals[4], 
        runProgram([...inputData], vals[3], 
        runProgram([...inputData], vals[2], 
        runProgram([...inputData], vals[1], 
        runProgram([...inputData], vals[0], 0)))));

    if(finalResult > max) {
        max = finalResult;
        perm = results[t];
    }
}


console.log("Final Result: ", max);               
