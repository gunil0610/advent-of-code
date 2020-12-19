const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('');
// .split('\n')
// .filter((x) => x);

const rules = input
  .split('your ticket:')[0]
  .split('\n')
  .filter((x) => x);

const yourTicket = input
  .split('your ticket:')[1]
  .split('\n')
  .filter((x) => x)[0]
  .split(',');

const nearbyTickets = input
  .split('nearby tickets:')[1]
  .split('\n')
  .filter((x) => x)
  .map((x) => x.split(','));

const wrongNumber = [];

const checkNumber = (num) => {
  match = false;
  rules.forEach((line) => {
    const rangeArr = [];
    const range = line
      .split(':')[1]
      .split('or')
      .map((x) => x.trim());

    range.forEach((item) => {
      const num1 = item.split('-')[0];
      const num2 = item.split('-')[1];
      rangeArr.push(num1);
      rangeArr.push(num2);
    });

    if (
      (num >= parseInt(rangeArr[0]) && num <= parseInt(rangeArr[1])) ||
      (num >= parseInt(rangeArr[2]) && num <= parseInt(rangeArr[3]))
    ) {
      match = true;
    }
  });
  if (!match) {
    wrongNumber.push(num);
  }
};

nearbyTickets.forEach((line) => {
  line.forEach((num) => {
    checkNumber(parseInt(num));
  });
});

console.log(wrongNumber.reduce((acc, num) => acc + num, 0));
