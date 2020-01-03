var intcode = require("./intcode");
var inputData = require('./day19.json');



let x = 0;
let y = 900;
let lastStartX = 0;
let foundBeam = false;

function getNext(lastResult) {


   //if we found the beam, track it and store the x location
   if(!foundBeam && lastResult === 1) {
       lastStartX = x;
       foundBeam = true;
   }

   x++;


   //start a new line, found the end of the beam on this line
  if(foundBeam && lastResult === 0) {
       y++;
       x = lastStartX;
       foundBeam = false;
   }
   //console.log("Next: x=", x, " y=", y);
   return {x: x, y: y};
}

let count = 0;

let foundX = [];
let foundY = [];

async function doStuff() {
    while (true) {
        let program = intcode.runProgram([...inputData]);

        program.start();
        program.addInput(x);
        program.addInput(y);

        let result = await program.programPromise;

        if(result === 1) {
            foundX[x] = (foundX[x] || 0) + 1;
            
            if(foundX[x] >= 100) {
                foundY[y] = (foundY[y] || 0) + 1;
            }

            if(foundY[y] === 100) {
                return {x: x, y: y};
            }
        }

        console.log("Tried x:", x, " (", foundX[x] || 0, ") y: ", y, " (", foundY[y] || 0, ") with result ", result);

        getNext(result);
    }
}

doStuff().then(t => console.log("Done - x: ", t.x, " y: ", t.y ));
