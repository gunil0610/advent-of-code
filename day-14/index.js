const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

class Memory {
  constructor() {
    this.mem = {};
    this.mask = [];
  }

  save(location, value) {
    let prefix = '';
    for (let i = 0; i < 36 - value.length; i++) {
      prefix += '0';
    }

    const new_value = prefix + value;

    let res = [];
    this.mask.forEach((item, index) => {
      if (item === 'X') {
        res.push(new_value[index]);
      } else {
        res.push(item);
      }
    });
    // console.log(res.join(''));
    this.mem[location] = parseInt(res.join(''), 2);
  }

  changeMask(value) {
    this.mask = value.split('');
  }

  sumValue() {
    let sum = 0;
    for (const num in this.mem) {
      sum += this.mem[num];
    }
    console.log(sum);
  }
}

const mem = new Memory();

input.forEach((line) => {
  const order = line.split(' = ')[0];
  const value = line.split(' = ')[1];

  switch (order) {
    case 'mask':
      mem.changeMask(value);
      break;
    default:
      const location = parseInt(order.split('[')[1].split(']')[0]);
      mem.save(location, Number(value).toString(2));
      break;
  }
});

mem.sumValue();
