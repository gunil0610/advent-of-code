const fs = require('fs');

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

// // pt1
// const checkOccupied = (index, rowIndex, arr) => {
//   const intIndex = parseInt(index);
//   const rowIntIndex = parseInt(rowIndex);
//   const row = arr[rowIntIndex].split('');

//   let occupied =
//     (row[intIndex + 1] && row[intIndex + 1] === '#' ? 1 : 0) +
//     (row[intIndex - 1] && row[intIndex - 1] === '#' ? 1 : 0);

//   if (arr[rowIntIndex + 1]) {
//     const nextRow = arr[rowIntIndex + 1].split('');
//     const nextRowNum =
//       (nextRow[intIndex + 1] && nextRow[intIndex + 1] === '#' ? 1 : 0) +
//       (nextRow[intIndex] && nextRow[intIndex] === '#' ? 1 : 0) +
//       (nextRow[intIndex - 1] && nextRow[intIndex - 1] === '#' ? 1 : 0);
//     occupied += nextRowNum;
//   }
//   // check row before
//   if (arr[rowIntIndex - 1]) {
//     const beforeRow = arr[rowIntIndex - 1].split('');
//     const beforeRowNum =
//       (beforeRow[intIndex + 1] && beforeRow[intIndex + 1] === '#' ? 1 : 0) +
//       (beforeRow[intIndex] && beforeRow[intIndex] === '#' ? 1 : 0) +
//       (beforeRow[intIndex - 1] && beforeRow[intIndex - 1] === '#' ? 1 : 0);
//     occupied += beforeRowNum;
//   }
//   return occupied;
// };

// const rule = (inputArr, num) => {
//   const newArr = [];
//   for (const rowIndex in inputArr) {
//     const row = inputArr[rowIndex].split('');
//     const newRow = [];
//     for (const index in row) {
//       if (num === 1) {
//         if (row[index] === 'L') {
//           if (checkOccupied(index, rowIndex, inputArr) === 0) {
//             newRow.push('#');
//           } else {
//             newRow.push('L');
//           }
//         } else {
//           newRow.push(row[index]);
//         }
//       } else if (num === 2) {
//         if (row[index] === '#') {
//           if (checkOccupied(index, rowIndex, inputArr) >= 4) {
//             newRow.push('L');
//           } else {
//             newRow.push('#');
//           }
//         } else {
//           newRow.push(row[index]);
//         }
//       }
//     }
//     newArr.push(newRow.join(''));
//   }
//   return newArr;
// };

// pt2

const checkRight = (rowIndex, index, arr) => {
  const row = arr[rowIndex].split('');
  if (row[index] && row[index] === '#') {
    return 1;
  } else if (row[index] && row[index] === 'L') {
    return 0;
  } else if (row[index] && row[index] === '.') {
    return checkRight(rowIndex, index + 1, arr);
  }
  return 0;
};
const checkLeft = (rowIndex, index, arr) => {
  const row = arr[rowIndex].split('');
  if (row[index] && row[index] === '#') {
    return 1;
  } else if (row[index] && row[index] === 'L') {
    return 0;
  } else if (row[index] && row[index] === '.') {
    return checkLeft(rowIndex, index - 1, arr);
  }
  return 0;
};
const checkUpRight = (rowIndex, index, arr) => {
  if (!arr[rowIndex]) {
    return 0;
  }
  const row = arr[rowIndex].split('');
  if (row[index] && row[index] === '#') {
    return 1;
  } else if (row[index] && row[index] === 'L') {
    return 0;
  } else if (row[index] && row[index] === '.') {
    return checkUpRight(rowIndex - 1, index + 1, arr);
  }
  return 0;
};
const checkUp = (rowIndex, index, arr) => {
  if (!arr[rowIndex]) {
    return 0;
  }
  const row = arr[rowIndex].split('');
  if (row[index] && row[index] === '#') {
    return 1;
  } else if (row[index] && row[index] === 'L') {
    return 0;
  } else if (row[index] && row[index] === '.') {
    return checkUp(rowIndex - 1, index, arr);
  }
  return 0;
};
const checkUpLeft = (rowIndex, index, arr) => {
  if (!arr[rowIndex]) {
    return 0;
  }
  const row = arr[rowIndex].split('');
  if (row[index] && row[index] === '#') {
    return 1;
  } else if (row[index] && row[index] === 'L') {
    return 0;
  } else if (row[index] && row[index] === '.') {
    return checkUpLeft(rowIndex - 1, index - 1, arr);
  }
  return 0;
};
const checkDownRight = (rowIndex, index, arr) => {
  if (!arr[rowIndex]) {
    return 0;
  }
  const row = arr[rowIndex].split('');
  if (row[index] && row[index] === '#') {
    return 1;
  } else if (row[index] && row[index] === 'L') {
    return 0;
  } else if (row[index] && row[index] === '.') {
    return checkDownRight(rowIndex + 1, index + 1, arr);
  }
  return 0;
};
const checkDown = (rowIndex, index, arr) => {
  if (!arr[rowIndex]) {
    return 0;
  }
  const row = arr[rowIndex].split('');
  if (row[index] && row[index] === '#') {
    return 1;
  } else if (row[index] && row[index] === 'L') {
    return 0;
  } else if (row[index] && row[index] === '.') {
    return checkDown(rowIndex + 1, index, arr);
  }
  return 0;
};
const checkDownLeft = (rowIndex, index, arr) => {
  if (!arr[rowIndex]) {
    return 0;
  }
  const row = arr[rowIndex].split('');
  if (row[index] && row[index] === '#') {
    return 1;
  } else if (row[index] && row[index] === 'L') {
    return 0;
  } else if (row[index] && row[index] === '.') {
    return checkDownLeft(rowIndex + 1, index - 1, arr);
  }
  return 0;
};

const checkOccupied = (index, rowIndex, arr) => {
  const intIndex = parseInt(index);
  const rowIntIndex = parseInt(rowIndex);

  let occupied =
    checkRight(rowIntIndex, intIndex + 1, arr) +
    checkLeft(rowIntIndex, intIndex - 1, arr) +
    checkUp(rowIntIndex - 1, intIndex, arr) +
    checkUpRight(rowIntIndex - 1, intIndex + 1, arr) +
    checkUpLeft(rowIntIndex - 1, intIndex - 1, arr) +
    checkDown(rowIntIndex + 1, intIndex, arr) +
    checkDownLeft(rowIntIndex + 1, intIndex - 1, arr) +
    checkDownRight(rowIntIndex + 1, intIndex + 1, arr);
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
          if (checkOccupied(index, rowIndex, inputArr) >= 5) {
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

const run = (arr) => {
  const rule1Arr = rule(arr, 1);
  if (checkArrEqual(arr, rule1Arr)) {
    return rule1Arr;
  } else {
    const rule2Arr = rule(rule1Arr, 2);
    if (checkArrEqual(rule1Arr, rule2Arr)) {
      return rule2Arr;
    } else {
      return run(rule2Arr);
    }
  }
};

const printOccupiedNumber = (arr) => {
  console.log(
    arr.reduce((acc, line) => {
      const lineArr = line.split('');
      lineArr.forEach((seat) => {
        if (seat === '#') {
          acc += 1;
        }
      });
      return acc;
    }, 0)
  );
};

const resArr = run(lines);
printOccupiedNumber(resArr);
// const arr1 = rule(lines, 1);
// const arr2 = rule(arr1, 2);
// const arr3 = rule(arr2, 1);
// const arr4 = rule(arr3, 1);
// const arr5 = rule(arr4, 1);
// const arr6 = rule(arr5, 1);
// console.log(arr1);
// console.log(arr2);
// console.log(arr3);
// console.log(arr4);
// console.log(arr5);
// console.log(arr6);
