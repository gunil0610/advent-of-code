const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

// // pt1
// class Memory {
//   constructor() {
//     this.mem = {};
//     this.mask = [];
//   }

//   save(location, value) {
//     let prefix = '';
//     for (let i = 0; i < 36 - value.length; i++) {
//       prefix += '0';
//     }

//     const new_value = prefix + value;

//     let res = [];
//     this.mask.forEach((item, index) => {
//       if (item === 'X') {
//         res.push(new_value[index]);
//       } else {
//         res.push(item);
//       }
//     });
//     // console.log(res.join(''));
//     this.mem[location] = parseInt(res.join(''), 2);
//   }

//   changeMask(value) {
//     this.mask = value.split('');
//   }

//   sumValue() {
//     let sum = 0;
//     for (const num in this.mem) {
//       sum += this.mem[num];
//     }
//     console.log(sum);
//   }
// }

// const mem = new Memory();

// input.forEach((line) => {
//   const order = line.split(' = ')[0];
//   const value = line.split(' = ')[1];

//   switch (order) {
//     case 'mask':
//       mem.changeMask(value);
//       break;
//     default:
//       const location = parseInt(order.split('[')[1].split(']')[0]);
//       mem.save(location, Number(value).toString(2));
//       break;
//   }
// });

// mem.sumValue();

// pt2
class Version2 {
  constructor() {
    this.mem = {};
    this.code = {};
    this.mask = [];
  }

  parse(data) {
    let m = new RegExp('(mask)');
    let mem = new RegExp('[[0-9]+]', 'g');
    let ad = new RegExp(' [0-9]+', 'g');
    let i = 0;
    data.forEach((line) => {
      if (line.match(m)) {
        if (!this.code[i]) {
          this.code[i] = {
            mask: 0,
            writes: [],
          };
        }
        this.code[i].mask = line.slice(7).split('');
        i++;
      } else {
        let address = line.match(mem)[0];
        let val = line.match(ad)[0].trim();
        this.code[i - 1].writes.push({
          address: address.substring(1, address.length - 1),
          value: Number(val).toString(2).padStart(36, '0'),
        });
      }
    });
  }

  save(mask, writes) {
    writes.forEach((elm) => {
      let addresses = this.decode(
        mask,
        Number(elm.address).toString(2).padStart(36, '0')
      );
      addresses.forEach((add) => {
        if (!this.mem[add]) {
          this.mem[add] = 0;
        }
        this.mem[add] = parseInt(elm.value, 2);
      });
    });
  }

  decode(mask, value) {
    let res = [];
    mask.forEach((item, index) => {
      if (item === '0') {
        res.push(value[index]);
      } else {
        res.push(item);
      }
    });
    return this.processX(res, 0, []);
  }

  processX(address, index = 0, addresses) {
    if (index === address.length) {
      addresses.push(address.toString().replace(/,/g, ''));
      return;
    }

    if (address[index] === 'X') {
      address[index] = '0';
      this.processX(address, index + 1, addresses);
      address[index] = '1';
      this.processX(address, index + 1, addresses);

      address[index] = 'X';
    } else {
      this.processX(address, index + 1, addresses);
    }
    return addresses;
  }

  run(data) {
    this.parse(data);
    for (const i in this.code) {
      this.save(this.code[i]['mask'], this.code[i]['writes']);
    }

    this.sumValue();
  }

  sumValue() {
    let sum = 0;
    for (const num in this.mem) {
      sum += this.mem[num];
    }
    console.log(sum);
  }
}

const decoder = new Version2();

decoder.run(input);
