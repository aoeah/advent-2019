 var intcode = require("./intcode");
 var inputData = require('./day17.json');

let lines = [];
let currentLine = "";

let total = 0;

 function outputCallback(output) {
    switch(output) {
        case 10:
            lines.push(currentLine);
        //    findIntersections();
            currentLine = "";
            break;
        case 35:
            currentLine += String.fromCharCode(output);

            //look back two.  If it is an intersection, then replae it
            let intersection = determineIntersection(currentLine.length - 2, lines.length);
            
            if (intersection) { 
                currentLine = replaceAt(currentLine, currentLine.length - 2, "O");
                total += ((currentLine.length - 2) * lines.length);
            }
            break;
        default:
            currentLine += String.fromCharCode(output);
            break;
    }
 }

 function replaceAt(s, i, c) {
     return s.substring(0, i) + c + s.substring(i+c.length);
 }

 function determineIntersection(x, y) {
     if(x <= 0 || y <= 0) { return false; }

    if(currentLine.charAt(x) === "#" && currentLine.charAt(x-1) === "#" 
        && currentLine.charAt(x+1) === "#" && lines[y-1].charAt(x) === "#") {
        return true;
    }

    return false;
 }

 function printBoard() {
     for(let line in lines) {
         console.log(lines[line]);
     }
 }

 async function doStuff() {
    // for(let y = 1900; y < 2100; y++) {
    //     let line = "";
    //     for (let x = 1800; x < 2000; x++) {
            let program = intcode.runProgram([...inputData], outputCallback);

            program.start();
            //program.addInput(x);
            //program.addInput(y);

            result = await program.programPromise;
            //line += result;
        //}

        //console.log(line);
    //}
}

doStuff().then(t => {
    printBoard();
    console.log("Total: ", total);
});
