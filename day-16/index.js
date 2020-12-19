const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('');

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
    return false;
  }
  return true;
};

// // pt1
// const wrongNumber = [];

// nearbyTickets.forEach((line) => {
//   line.forEach((num) => {
//     if (!checkNumber(parseInt(num))) {
//       wrongNumber.push(parseInt(num));
//     }
//   });
// });

// console.log(wrongNumber.reduce((acc, num) => acc + num, 0));

// pt2

const validTickets = [];

nearbyTickets.forEach((line) => {
  let valid = true;
  line.forEach((num) => {
    if (!checkNumber(parseInt(num))) {
      valid = false;
    }
  });
  if (valid) {
    validTickets.push(line);
  }
});

let lineRule = {};

validTickets.forEach((ticket) => {
  ticket.forEach((num, index) => {
    rules.forEach((line) => {
      const rangeArr = [];
      const ruleName = line.split(':')[0];
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
        // if rule matches num
        if (!lineRule[index]) {
          lineRule[index] = {};
        }
        if (lineRule[index][ruleName] !== false) {
          lineRule[index][ruleName] = true;
        }
      } else {
        // if rule doesn't matches num
        if (!lineRule[index]) {
          lineRule[index] = {};
        }
        lineRule[index][ruleName] = false;
      }
    });
  });
});

// remove false value
for (const [key, value] of Object.entries(lineRule)) {
  for (const [key2, value2] of Object.entries(value)) {
    if (!value2) {
      delete lineRule[key][key2];
    }
  }
}

const result = {};

const deleteOne = () => {
  if (Object.keys(lineRule).length > 0) {
    for (const [key, value] of Object.entries(lineRule)) {
      if (Object.keys(value).length === 1) {
        let ruleKey = Object.entries(value)[0][0];
        result[key] = ruleKey;
        delete lineRule[key];
        for (const [key2, value2] of Object.entries(lineRule)) {
          if (value2.hasOwnProperty(ruleKey)) {
            delete lineRule[key2][ruleKey];
          }
        }
      }
    }
    deleteOne();
  }
};

deleteOne();
let finalRes = 1;
for (const [key, value] of Object.entries(result)) {
  if (value.includes('departure')) {
    finalRes *= yourTicket[key];
  }
}
console.log(finalRes);
