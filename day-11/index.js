const fs = require('fs');

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

const checkOccupied = (index, rowIndex, arr) => {
  const intIndex = parseInt(index);
  const rowIntIndex = parseInt(rowIndex);
  const row = arr[rowIntIndex].split('');

  let occupied =
    (row[intIndex + 1] && row[intIndex + 1] === '#' ? 1 : 0) +
    (row[intIndex - 1] && row[intIndex - 1] === '#' ? 1 : 0);

  if (arr[rowIntIndex + 1]) {
    const nextRow = arr[rowIntIndex + 1].split('');
    const nextRowNum =
      (nextRow[intIndex + 1] && nextRow[intIndex + 1] === '#' ? 1 : 0) +
      (nextRow[intIndex] && nextRow[intIndex] === '#' ? 1 : 0) +
      (nextRow[intIndex - 1] && nextRow[intIndex - 1] === '#' ? 1 : 0);
    occupied += nextRowNum;
  }
  // check row before
  if (arr[rowIntIndex - 1]) {
    const beforeRow = arr[rowIntIndex - 1].split('');
    const beforeRowNum =
      (beforeRow[intIndex + 1] && beforeRow[intIndex + 1] === '#' ? 1 : 0) +
      (beforeRow[intIndex] && beforeRow[intIndex] === '#' ? 1 : 0) +
      (beforeRow[intIndex - 1] && beforeRow[intIndex - 1] === '#' ? 1 : 0);
    occupied += beforeRowNum;
  }
  return occupied;
};

const rule = (inputArr, num) => {
  const newArr = [];
  for (const rowIndex in inputArr) {
    const row = inputArr[rowIndex].split('');
    const newRow = [];
    for (const index in row) {
      if (num === 1) {
        if (row[index] === 'L') {
          if (checkOccupied(index, rowIndex, inputArr) === 0) {
            newRow.push('#');
          } else {
            newRow.push('L');
          }
        } else {
          newRow.push(row[index]);
        }
      } else if (num === 2) {
        if (row[index] === '#') {
          if (checkOccupied(index, rowIndex, inputArr) >= 4) {
            newRow.push('L');
          } else {
            newRow.push('#');
          }
        } else {
          newRow.push(row[index]);
        }
      }
    }
    newArr.push(newRow.join(''));
  }
  return newArr;
};

const checkArrEqual = (arr1, arr2) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((val, index) => val === arr2[index])
  );
};

const part1 = (arr) => {
  const rule1Arr = rule(arr, 1);
  if (checkArrEqual(arr, rule1Arr)) {
    return rule1Arr;
  } else {
    const rule2Arr = rule(rule1Arr, 2);
    if (checkArrEqual(rule1Arr, rule2Arr)) {
      return rule2Arr;
    } else {
      return part1(rule2Arr);
    }
  }
};

const resArr = part1(lines);
console.log(
  resArr.reduce((acc, line) => {
    const lineArr = line.split('');
    lineArr.forEach((seat) => {
      if (seat === '#') {
        acc += 1;
      }
    });
    return acc;
  }, 0)
);
