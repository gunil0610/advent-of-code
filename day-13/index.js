const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

const time = input[0];
const buses = input[1]
  .split('x')
  .join('')
  .split(',')
  .filter((x) => x);

// // pt1
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
