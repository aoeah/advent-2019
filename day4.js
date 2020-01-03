let result = 0;
for(let i = 0; i < 999999; i++) {
    let t = i.toString();

    if(i < 254032 || i > 789860) {continue; }

    if(t.length !== 6) { continue; }

    if(!hasTwoDigits(t)) { continue; }

    if(!digitsAreIncreasing(t)) {continue; }

    result++;
}

console.log("Result: ", result);

function hasTwoDigits(num) {
    
    for(let i = 0; i < 10; i++)
    {
        let digits = num.indexOf(i.toString().repeat(2));
        let digits3 = num.indexOf(i.toString().repeat(3));

        if(digits === -1) { continue; }

        if(digits !== digits3) {
            return true;
        }

        // if((digits === 0 && digits3 === 4)||()) {
        //     return true;
        // }
    }

    return false;
}

function digitsAreIncreasing(num) {
    let last = 0;
    for(let index in num) {
        if (last <= num[index]) {
            last = num[index];
        }
        else {
            return false;
        }
    }

    return true;
}