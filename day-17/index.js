const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .map((x) => [...x]);

let map = new Map(); // key:x,y,z, value: active/inactive

// pt1
// input.forEach((line, y) => {
//   line.forEach((value, x) => {
//     const active = value === '#';
//     const id = [x, y, 0].join(',');
//     map.set(id, active);
//   });
// });

// // function to get nearby 26 cubes
// const getNeighbors = (x, y, z, map) => {
//   const result = [];
//   for (let newX = x - 1; newX <= x + 1; newX++) {
//     for (let newY = y - 1; newY <= y + 1; newY++) {
//       for (let newZ = z - 1; newZ <= z + 1; newZ++) {
//         if (!(newX === x && newY === y && newZ === z)) {
//           const key = [newX, newY, newZ].join(',');
//           if (map.has(key)) {
//             result.push(map.get(key));
//           } else {
//             result.push(false);
//           }
//         }
//       }
//     }
//   }
//   return result;
// };

// for (let i = 0; i < 6; i++) {
//   const keys = map.keys();
//   let minX = null;
//   let minY = null;
//   let minZ = null;
//   let maxX = null;
//   let maxY = null;
//   let maxZ = null;
//   for (const key of keys) {
//     const [x, y, z] = key.split(',').map((x) => parseInt(x));

//     if (x < minX) minX = x;
//     if (y < minY) minY = y;
//     if (z < minZ) minZ = z;
//     if (x > maxX) maxX = x;
//     if (y > maxY) maxY = y;
//     if (z > maxZ) maxZ = z;
//   }

//   const newState = new Map();

//   for (let x = minX - 1; x <= maxX + 1; x++) {
//     for (let y = minY - 1; y <= maxY + 1; y++) {
//       for (let z = minZ - 1; z <= maxZ + 1; z++) {
//         const neighbors = getNeighbors(x, y, z, map);
//         const activeNeighbors = neighbors.filter((x) => x).length;
//         const key = `${x},${y},${z}`;
//         const isActive = map.has(key) ? map.get(key) : false;

//         if (isActive && !(activeNeighbors === 2 || activeNeighbors === 3)) {
//           newState.set(key, false);
//         } else if (!isActive && activeNeighbors === 3) {
//           newState.set(key, true);
//         } else {
//           newState.set(key, isActive);
//         }
//       }
//     }
//   }

//   map = newState;
// }

input.forEach((line, y) => {
  line.forEach((value, x) => {
    const active = value === '#';
    const id = [x, y, 0, 0].join(',');
    map.set(id, active);
  });
});

// function to get nearby 26 cubes
const getNeighbors = (x, y, z, w, map) => {
  const result = [];
  for (let newX = x - 1; newX <= x + 1; newX++) {
    for (let newY = y - 1; newY <= y + 1; newY++) {
      for (let newZ = z - 1; newZ <= z + 1; newZ++) {
        for (let newW = w - 1; newW <= w + 1; newW++) {
          if (!(newX === x && newY === y && newZ === z && newW === w)) {
            const key = [newX, newY, newZ, newW].join(',');
            if (map.has(key)) {
              result.push(map.get(key));
            } else {
              result.push(false);
            }
          }
        }
      }
    }
  }
  return result;
};

for (let i = 0; i < 6; i++) {
  const keys = map.keys();
  let minX = null;
  let minY = null;
  let minZ = null;
  let minW = null;
  let maxX = null;
  let maxY = null;
  let maxZ = null;
  let maxW = null;
  for (const key of keys) {
    const [x, y, z, w] = key.split(',').map((x) => parseInt(x));

    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (z < minZ) minZ = z;
    if (w < minW) minW = w;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (z > maxZ) maxZ = z;
    if (w > maxW) maxW = w;
  }

  const newState = new Map();

  for (let x = minX - 1; x <= maxX + 1; x++) {
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let z = minZ - 1; z <= maxZ + 1; z++) {
        for (let w = minW - 1; w <= maxW + 1; w++) {
          const neighbors = getNeighbors(x, y, z, w, map);
          const activeNeighbors = neighbors.filter((x) => x).length;
          const key = `${x},${y},${z},${w}`;
          const isActive = map.has(key) ? map.get(key) : false;

          if (isActive && !(activeNeighbors === 2 || activeNeighbors === 3)) {
            newState.set(key, false);
          } else if (!isActive && activeNeighbors === 3) {
            newState.set(key, true);
          } else {
            newState.set(key, isActive);
          }
        }
      }
    }
  }

  map = newState;
}

let sum = 0;
for (const [key, val] of map) {
  if (val) {
    sum += 1;
  }
}
console.log(sum);
