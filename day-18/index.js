const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

// pt 1
// const solve = (string) => {
//   let tokens = string.split(' ');

//   while (tokens.length > 1) {
//     tokens = [eval(tokens.slice(0, 3).join(''))].concat(tokens.slice(3));
//   }
//   return tokens[0];
// };

// const solveWithParenthesis = (string) => {
//   while (/\(/.test(string)) {
//     string = string.replace(/\(([^()]+)\)/g, (match, group) => {
//       return solve(group);
//     });
//   }
//   return solve(string);
// };

// const res = input.reduce((acc, line) => {
//   acc += solveWithParenthesis(line);
//   return acc;
// }, 0);

// console.log(res);

// pt2
const solve2 = (string) => {
  let tokens = string.split(' * ');

  let newToken = tokens.map((item) => eval(item));
  return eval(newToken.join('*'));
  // while (tokens.length > 1) {
  //   tokens = [eval(tokens[0].join(''))].concat(tokens.slice(3));
  // }
  // return tokens[0];
};

const solveWithParenthesis2 = (string) => {
  while (/\(/.test(string)) {
    string = string.replace(/\(([^()]+)\)/g, (match, group) => {
      return solve2(group);
    });
  }
  return solve2(string);
};

const res2 = input.reduce((acc, line) => {
  acc += solveWithParenthesis2(line);
  return acc;
}, 0);

console.log(res2);
