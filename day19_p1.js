 var intcode = require("./intcode");
 var inputData = require('./day19.json');

 

//let x = 1;
//let y = 0;

function getNext() {
    x++;

    if(x === 50) {
        y++;

        if(y===50) {
            console.log("Done");
            return null;
        }

        x = 0;
    }
    console.log("Next: x=", x, " y=", y);
    return {x: x, y: y};
}

let count = 0;

function outputCallback(output) {
    count += output;

 
    // let nextValue = getNext();
    // if(nextValue === null) {
    //     console.log("Total count: ", count);
    //     return;
    // }
    
}

async function doStuff() {
    for(let y = 1900; y < 2100; y++) {
        let line = "";
        for (let x = 1800; x < 2000; x++) {
            let program = intcode.runProgram([...inputData], outputCallback);

            program.start();
            program.addInput(x);
            program.addInput(y);

            result = await program.programPromise;
            line += result;
        }

        console.log(line);
    }
}

doStuff().then(t => console.log("Done - ", count));

 for(let i = 0; i < 50; i++) {
    
  let program = intcode.runProgram([...inputData], o => outputCallback(o, i), i, true);
  
  computers.push(program);
}
