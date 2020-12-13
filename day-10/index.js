const day10Input = `99
104
120
108
67
136
80
44
129
113
158
157
89
60
138
63
35
57
61
153
116
54
7
22
133
130
5
72
2
28
131
123
55
145
151
42
98
34
140
146
100
79
117
154
9
83
132
45
43
107
91
163
86
115
39
76
36
82
162
6
27
101
150
30
110
139
109
1
64
56
161
92
62
69
144
21
147
12
114
18
137
75
164
33
152
23
68
51
8
95
90
48
29
26
165
81
13
126
14
143
15`;

const day10InputArr = day10Input.split('\n');

day10InputArr.sort((a, b) => a - b);
const sortedIntArr = day10InputArr.map((num) => parseInt(num));

// // pt1
// const countObj = { 1: 1, 3: 1 };

// for (const i in day10InputArr) {
//   const index = parseInt(i);
//   if (day10InputArr[index + 1]) {
//     const currentNum = sortedIntArr[index];
//     const nextNum = sortedIntArr[index + 1];

//     if (nextNum - currentNum === 1) {
//       countObj[1] += 1;
//     } else if (nextNum - currentNum === 3) {
//       countObj[3] += 1;
//     }
//   }
// }

// console.log(countObj[1] * countObj[3]);

// pt2

// const exArr = `28
// 33
// 18
// 42
// 31
// 14
// 46
// 20
// 48
// 47
// 24
// 23
// 49
// 45
// 19
// 38
// 39
// 11
// 1
// 32
// 25
// 35
// 8
// 17
// 7
// 9
// 4
// 2
// 34
// 10
// 3`
//   .split('\n')
//   .sort((a, b) => a - b);

// const intExArr = exArr.map((num) => parseInt(num));
// console.log(intExArr.includes(1 + 3));

const memoizeObj = {};

const nextStep = (currentNum, array) => {
  if (currentNum in memoizeObj) {
    return memoizeObj[currentNum];
  }

  if (array.length <= 1) {
    return 1;
  } else {
    const plus1 = array.includes(currentNum + 1);
    const plus2 = array.includes(currentNum + 2);
    const plus3 = array.includes(currentNum + 3);
    console.log(plus1, plus2, plus3);
    if (plus3) {
      if (plus2) {
        if (plus1) {
          // +1,+2,+3 exists
          const result =
            nextStep(array[0], array.slice(1)) +
            nextStep(array[1], array.slice(2)) +
            nextStep(array[2], array.slice(3));
          memoizeObj[currentNum] = result;
          return result;
        } else {
          // +2,+3 exists
          const result =
            nextStep(array[0], array.slice(1)) +
            nextStep(array[1], array.slice(2));
          memoizeObj[currentNum] = result;
          return result;
        }
      } else {
        if (plus1) {
          // +1, +3 exists
          const result =
            nextStep(array[0], array.slice(1)) +
            nextStep(array[1], array.slice(2));
          memoizeObj[currentNum] = result;
          return result;
        } else {
          // +3 exists
          const result = nextStep(array[0], array.slice(1));
          memoizeObj[currentNum] = result;
          return result;
        }
      }
    } else if (plus2) {
      if (plus1) {
        // +1,+2 exists
        const result =
          nextStep(array[0], array.slice(1)) +
          nextStep(array[1], array.slice(2));
        memoizeObj[currentNum] = result;
        return result;
      } else {
        // +2 exists
        const result = nextStep(array[0], array.slice(1));
        memoizeObj[currentNum] = result;
        return result;
      }
    } else if (plus1) {
      // +1 exists
      const result = nextStep(array[0], array.slice(1));
      memoizeObj[currentNum] = result;
      return result;
    }
  }
};

res = nextStep(0, sortedIntArr);

console.log(res);
// console.log(sortedIntArr.slice(1));
