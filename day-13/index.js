const { timeStamp, time } = require('console');
const fs = require('fs');
const { parse } = require('path');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

// // pt1

// const time = input[0];
// const buses = input[1]
//   .split('x')
//   .join('')
//   .split(',')
//   .filter((x) => x);

// const pt1 = (time, buses) => {
//   let minTime = 1000;
//   let earliestBus = 0;
//   for (const bus of buses) {
//     newTime = Math.ceil(time / bus) * bus - time;
//     if (newTime < minTime) {
//       minTime = newTime;
//       earliestBus = bus;
//     }
//   }
//   console.log(minTime * earliestBus);
// };

// pt1(time, buses);

// pt2
const part2 = () => {
  const pt2Input = input[1].split(',').filter((x) => x);

  const buses = [];
  pt2Input.forEach((bus, index) => {
    if (bus !== 'x') {
      buses.push([parseInt(bus), index]);
    }
  });

  let step = buses[0][0];
  let i = 0;

  buses.slice(1).forEach(([bus, busIndex]) => {
    while (true) {
      if ((i + busIndex) % bus === 0) {
        step *= bus;
        break;
      }
      i += step;
    }
  });

  console.log(i);
};

part2();
