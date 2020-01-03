 var intcode = require("./intcode-day23");
 var inputData = require('./day23.json');

let computers = [];
let outputData = [];
let destination = [];
let natComputer = nat();

function outputCallback(output, computer) {
    if(!isSet(outputData[computer]) && !isSet(destination[computer])) {
        destination[computer] = output;
    }
    else if(!isSet(outputData[computer]) && isSet(destination[computer])) {
        if(computer === 255) {
            console.log("Output to computer 255: ", output);
        }
        outputData[computer] = output;
    }
    else {
        if(destination[computer] === 255) {
            console.log("Sending val to nat: ", output);
            natComputer.addInput({ x: outputData[computer], y: output})
        }
        else {
            console.log("Sending X=", outputData[computer], ", Y=", output, " to computer: ", destination[computer], " from computer: ", computer);

            computers[destination[computer]].addInput({ x: outputData[computer], y: output});
        }

        destination[computer] = null;
        outputData[computer] = null;
    }
}
let finalResultNat = 0;

function nat() {
    let lastInput = null;
    let lastYValSent = null;
    let done = false;

    function addInput(input) {
        lastInput = input;
    }
    

    setInterval(() => {
        if(computers.every(t => t.idle()) && lastInput) {
            if(done) {
                console.log("Final Result: ", finalResultNat);
                 return; 
                }

                if(lastInput.y === lastYValSent) {
                    finalResultNat = lastInput;
                    console.log("Final Result: ", finalResultNat);
                    done = true;
                }
                else {
                    lastYValSent = lastInput.y;
                }

            computers[0].addInput(lastInput);

            //count++;
        }
    }, 500);

    return {
        addInput: addInput
    };
}


function isSet(theVal) {
    if(typeof theVal === 'undefined' || theVal === null) {
        return false;
    }

    return true;
}

for(let i = 0; i < 50; i++) {
    
  let program = intcode.runProgram([...inputData], o => outputCallback(o, i), i, true);
  
  computers.push(program);
}



for(let i = 0; i < 50; i++) {
    computers[i].start();
    computers[i].addInput(i);
}

for(let i = 0; i < 50; i++) {
    computers[i].addInput(i);
}

program.programPromise
    .then(t => {
        console.log("Tile count: ", tileCount);
    });
 

    setupGame();
    bindHandlers();
 program.start();


//  process.stdin.setRawMode(true);
//  keypress(process.stdin);
//  process.stdin.resume();