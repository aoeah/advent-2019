
// Problem Input
// <x=6, y=10, z=10>
// <x=-9, y=3, z=17>
// <x=9, y=-4, z=14>
// <x=4, y=14, z=4>
// let moons = [
//     {
//         x : 6, y : 10, z : 10, vX : 0, vY : 0, vZ : 0
//     },
//     {
//         x : -9, y : 3, z : 17, vX : 0, vY : 0, vZ : 0
//     },
//     {
//         x : 9, y : -4, z : 14, vX : 0, vY : 0, vZ : 0
//     },
//     {
//         x : 4, y : 14, z : 4, vX : 0, vY : 0, vZ : 0
//     }
// ];

//TEST INPUT:
//<x=-1, y=0, z=2>
//<x=2, y=-10, z=-7>
//<x=4, y=-8, z=8>
//<x=3, y=5, z=-1>

//  let moons = [
//      {
//          x : -1, y : 0, z : 2, vX : 0, vY : 0, vZ : 0
//      },
//      {
//          x : 2, y : -10, z : -7, vX : 0, vY : 0, vZ : 0
//      },
//      {
//          x : 4, y : -8, z : 8, vX : 0, vY : 0, vZ : 0
//      },
//      {
//          x : 3, y : 5, z : -1, vX : 0, vY : 0, vZ : 0
//      }
// ];

function updateVelocity(board) {
    for(let moon in board) {
        let xA = 0;
        let yA = 0;
        let zA = 0;
        for (let innerMoon in board) {
            if(moon === innerMoon) { continue; }

            if(board[moon].x < board[innerMoon].x) {
                xA++;
            }
            if(board[moon].x > board[innerMoon].x) {
                xA--;
            }

            if(board[moon].y < board[innerMoon].y) {
                yA++;
            }
            if(board[moon].y > board[innerMoon].y) {
                yA--;
            }

            if(board[moon].z < board[innerMoon].z) {
                zA++;
            }
            if(board[moon].z > board[innerMoon].z) {
                zA--;
            }
        }

        let currentMoon = board[moon];
        currentMoon.vX = currentMoon.vX + xA;
        currentMoon.vY = currentMoon.vY + yA;
        currentMoon.vZ = currentMoon.vZ + zA;
    }
}

function updatePositions(board) {
    for(let moon in board) {
        let currentMoon = board[moon];
        currentMoon.x = currentMoon.x + currentMoon.vX;
        currentMoon.y = currentMoon.y + currentMoon.vY;
        currentMoon.z = currentMoon.z + currentMoon.vZ;

    }
}

function calculateEnergy(board) {
    let totalEnergy = 0;
    for(let moon in board) {
        let currentMoon = board[moon];
        totalEnergy += ((Math.abs(currentMoon.x) + Math.abs(currentMoon.y) + Math.abs(currentMoon.z)) * 
                        (Math.abs(currentMoon.vX) + Math.abs(currentMoon.vY) + Math.abs(currentMoon.vZ)));

    }

    return totalEnergy;
}

for(let i = 0; i < 1000; i++) {
    updateVelocity(moons);
    updatePositions(moons);
}

console.log("Total Energy: ", calculateEnergy(moons));
