const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split(',')
  .map((x) => parseInt(x));

const obj = {};

const part1 = (num, i) => {
  // stop when i is 2020
  if (i > 2019) {
    return num;
  }
  let nextNum = 0;

  if (input[i]) {
    nextNum = input[i];
    obj[num] = i;
    return part1(nextNum, i + 1);
  }

  if (obj[num]) {
    nextNum = i - obj[num];
  }
  obj[num] = i;
  return part1(nextNum, i + 1);
};

const res = part1(input[0], 1);
console.log(res);
