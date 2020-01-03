var data = require('./day2.json');

data[1] = 12;
data[2] = 2;

var opCodeIndex = 0;

while(true) {
    if(data[opCodeIndex] == 99) {
        console.log("Index 0: ", data[0]);
        return;
    }

    //add
    if(data[opCodeIndex] == 1) {
        var left = data[data[opCodeIndex + 1]];
        var right = data[data[opCodeIndex + 2]];

        data[data[opCodeIndex + 3]] = left + right;
    }

    //multiply
    if(data[opCodeIndex] == 2) {
        var left = data[data[opCodeIndex + 1]];
        var right = data[data[opCodeIndex + 2]];

        data[data[opCodeIndex + 3]] = left * right;
    }

    opCodeIndex += 4
}
