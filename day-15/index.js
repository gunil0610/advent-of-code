const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split(',')
  .map((x) => parseInt(x));

const obj = {};

// const part1 = (num, i) => {
//   // stop when i is 2020
//   if (i > 2019) {
//     return num;
//   }
//   let nextNum = 0;

//   if (input[i]) {
//     nextNum = input[i];
//     obj[num] = i;
//     console.log(nextNum, i);
//     return part1(nextNum, i + 1);
//   }

//   if (obj[num]) {
//     nextNum = i - obj[num];
//   }
//   obj[num] = i;
//   console.log(nextNum, i);
//   return part1(nextNum, i + 1);
// };

// const res = part1(input[0], 1);
// console.log(res);

const solve = (input, limit) => {
  let indexes = new Map(input.map((val, index) => [val, index + 1]));
  let bucket = NaN;
  let target = input[input.length - 1];
  for (let index = input.length; index < limit; index++) {
    target = indexes.has(target) ? index - indexes.get(target) : 0;
    indexes.set(bucket, index);
    bucket = target;
  }
  return target;
};

const limit = 30000000;

res = solve(input, limit);
console.log(res);
