const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split(',')
  .filter((x) => x);

console.log(input);
