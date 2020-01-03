var inputData = require('./day7.json');


function runProgram(data, callback) {
    let startProgram = null;
    let startPromise = new Promise(t => { startProgram = t });

    async function internalRunProgram() {
        await startPromise;
        let opCodeIndex = 0;
        var outputCode = Number.NaN;
        var inputIndex = 1;
        var relativeOffset = 0;

        while(true) {
            var rawOpCode = data[opCodeIndex];
            var opcode = parseOpCode(data[opCodeIndex]);

            //console.log("Running Op Code: ", opcode);

            if(opcode == 99) {
                return outputCode;
            }

            //add - 3 params
            if(opcode == 1) {
                //opCode, paramCount, index, data, currentOpCodeIndex
                let left = getParam(rawOpCode, 3, 0, data, opCodeIndex); //data[data[opCodeIndex + 1]];
                let right = getParam(rawOpCode, 3, 1, data, opCodeIndex);
                let location = getParam(rawOpCode, 3, 2, data, opCodeIndex, true);

                data[location.value] = left.value + right.value;
                opCodeIndex += 4
            }

            //multiply - 3 params
            if(opcode == 2) {
                let left = getParam(rawOpCode, 3, 0, data, opCodeIndex); //data[data[opCodeIndex + 1]];
                let right = getParam(rawOpCode, 3, 1, data, opCodeIndex);
                let location = getParam(rawOpCode, 3, 2, data, opCodeIndex, true);

                data[location.value] = left.value * right.value;
                opCodeIndex += 4
            }

            //input
            if(opcode == 3) {
                let location = getParam(rawOpCode, 1, 0, data, opCodeIndex, true);

                //let location = data[opCodeIndex + 1];
                data[location.value] = await getInput(); //arguments[inputIndex];
                inputIndex++;
                opCodeIndex += 2
            }

            //output
            if(opcode == 4) {
                let location = getParam(rawOpCode, 1, 0, data, opCodeIndex);
                
                if(callback) {
                    callback(location.value);
                }
                else {
                    console.log("Output: ", location.value); 
                }

                outputCode = location.value;
                opCodeIndex += 2
            }

            //jump if true
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

            //jump if false
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

            //less than
            if(opcode == 7) {
                let left = getParam(rawOpCode, 3, 0, data, opCodeIndex);
                let right = getParam(rawOpCode, 3, 1, data, opCodeIndex);
                let location = getParam(rawOpCode, 3, 2, data, opCodeIndex, true);

                if(left.value < right.value) {
                    //data[data[opCodeIndex + 3]] = 1;
                    data[location.value] = 1;
                }
                else {
                    data[location.value] = 0;
                }

                opCodeIndex += 4;
            }

            //equals
            if(opcode == 8) {
                let left = getParam(rawOpCode, 3, 0, data, opCodeIndex);
                let right = getParam(rawOpCode, 3, 1, data, opCodeIndex);
                let location = getParam(rawOpCode, 3, 2, data, opCodeIndex, true);

                if(left.value === right.value) {
                    //data[data[opCodeIndex + 3]] = 1;
                    data[location.value] = 1;
                }
                else {
                    data[location.value] = 0;
                }

                opCodeIndex += 4;
            }

            //update relative value
            if(opcode == 9) {
                let newOffset = getParam(rawOpCode, 1, 0, data, opCodeIndex);
                relativeOffset = relativeOffset + newOffset.value;

                opCodeIndex += 2;
            }

            //console.log("Next opCodeIndex: " + opCodeIndex)
        }

        function parseOpCode(code) {
            return Number.parseInt(code.toString().padStart(2, "0").slice(-2));
        }
        
        function getParam(opCode, paramCount, index, data, currentOpCodeIndex, outputParam) {
            var type = opCode.toString().padStart(paramCount+2, "0").slice(paramCount - 1 - index, paramCount - index);
            var value = null;

            if(outputParam) {
                if(type === "2") {
                    return { type: type, value: relativeOffset + data[currentOpCodeIndex + 1 + index] };
                }
                return { type: type, value: data[currentOpCodeIndex + 1 + index] };
            }

            if(type === "0") {
                value = data[data[currentOpCodeIndex + 1 + index]] || 0;
            }
            else if(type ===("1")) {
                value = data[currentOpCodeIndex + 1 + index];
            }
            else if(type === "2") {
                offset = data[currentOpCodeIndex + 1 + index];
                value = data[relativeOffset + offset] || 0;
            }
        
            return {
                type: type,
                value: value
            }
        }

    }

    let input = [];
    let currentResolve = null;

    function checkInput() {
        if(currentResolve && input.length > 0) 
        {
            item = input.shift();
            currentResolve(item);
            currentResolve = null;
        }
    }

    setInterval(checkInput, 200);

    function addInput(item) {
        input.push(item);
    }

    function getInput() {
        return new Promise(r => {
            currentResolve = r;
        })
    }

    function start() {
        startProgram();
    }

    let programPromise = internalRunProgram();

    return {
        programPromise: programPromise,
        addInput: addInput,
        start: start
    };
}


var max = Number.MIN_VALUE;

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

heapPermutation([5,6,7,8,9], 5, 5);

var max = Number.MIN_VALUE;
var perm = [];

function handleOutput(data, worker, inputFuncs, totalFuncs) {
    console.log("Worker: ", worker, " produced output: ", data);
    inputFuncs[(worker+1)%totalFuncs](data);
}

let finalResult = Number.MIN_VALUE;

for (let t in results) {
    let vals = results[t];

    let promises = [];
    let inputMethods = [];
    
    let programRun0 = runProgram([...inputData], (data) => handleOutput(data, 0, inputMethods, 5));
    let programRun1 = runProgram([...inputData], (data) => handleOutput(data, 1, inputMethods, 5));
    let programRun2 = runProgram([...inputData], (data) => handleOutput(data, 2, inputMethods, 5));
    let programRun3 = runProgram([...inputData], (data) => handleOutput(data, 3, inputMethods, 5));
    let programRun4 = runProgram([...inputData], (data) => handleOutput(data, 4, inputMethods, 5));
    
    promises.push(programRun0.programPromise);
    promises.push(programRun1.programPromise);
    promises.push(programRun2.programPromise);
    promises.push(programRun3.programPromise);
    promises.push(programRun4.programPromise);
    
    inputMethods.push(programRun0.addInput);
    inputMethods.push(programRun1.addInput);
    inputMethods.push(programRun2.addInput);
    inputMethods.push(programRun3.addInput);
    inputMethods.push(programRun4.addInput);

    programRun0.addInput(vals[0]);
    programRun1.addInput(vals[1]);
    programRun2.addInput(vals[2]);
    programRun3.addInput(vals[3]);
    programRun4.addInput(vals[4]);

    programRun0.addInput(0);

    programRun4.programPromise.then(r => { console.log("Final result from app 4: ", r);
        if(r > max) {
            max = r;
            perm = results[t];
        }

        console.log("Max is: ", max);
    });

    programRun0.start();
    programRun1.start();
    programRun2.start();
    programRun3.start();
    programRun4.start();

    Promise.all(promises).then(() => {

    })
    //console.log("Final Result: ", finalResult);    
    
    //console.log("Done");    

    
}


console.log("Final Result: ", max); 