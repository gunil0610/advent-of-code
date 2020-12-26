const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

const solve = (string) => {
  let tokens = string.split(' ');

  while (tokens.length > 1) {
    tokens = [eval(tokens.slice(0, 3).join(''))].concat(tokens.slice(3));
  }
  return tokens[0];
};

const solveWithParenthesis = (string) => {
  while (/\(/.test(string)) {
    string = string.replace(/\(([^()]+)\)/g, (match, group) => {
      return solve(group);
    });
  }
  return solve(string);
};

const res = input.reduce((acc, line) => {
  acc += solveWithParenthesis(line);
  return acc;
}, 0);

console.log(res);
