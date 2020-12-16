const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

// pt1
// class Ship {
//   constructor() {
//     this.x = 0;
//     this.y = 0;
//     this.direction = 0;
//   }

//   moveForward(num) {
//     switch (this.direction) {
//       case 0:
//         this.x += num;
//         break;
//       case 180:
//         this.x -= num;
//         break;
//       case 270:
//         this.y += num;
//         break;
//       case 90:
//         this.y -= num;
//         break;
//     }
//   }

//   move(dir, num) {
//     switch (dir) {
//       case 'N':
//         this.y += num;
//         break;
//       case 'S':
//         this.y -= num;
//         break;
//       case 'E':
//         this.x += num;
//         break;
//       case 'W':
//         this.x -= num;
//         break;
//     }
//   }

//   turn(dir, deg) {
//     if (dir === 'R') {
//       this.direction += deg;
//     } else if (dir === 'L') {
//       this.direction -= deg;
//     }
//     if (this.direction >= 360) {
//       this.direction -= 360;
//     } else if (this.direction < 0) {
//       this.direction += 360;
//     }
//   }

//   calcMhtDistance() {
//     return Math.abs(this.x) + Math.abs(this.y);
//   }
// }

// pt2
class Ship {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dx = 10;
    this.dy = 1;
  }

  move(dir, num) {
    switch (dir) {
      case 'N':
        this.dy += num;
        break;
      case 'S':
        this.dy -= num;
        break;
      case 'E':
        this.dx += num;
        break;
      case 'W':
        this.dx -= num;
        break;
      case 'F':
        this.x += this.dx * num;
        this.y += this.dy * num;
        break;
      case 'R':
        {
          let angle = (-num * Math.PI) / 180;
          let dx = this.dx * Math.cos(angle) - this.dy * Math.sin(angle);
          let dy = this.dx * Math.sin(angle) + this.dy * Math.cos(angle);
          this.dx = Math.round(dx);
          this.dy = Math.round(dy);
        }
        break;
      case 'L':
        {
          let angle = (num * Math.PI) / 180;
          let dx = this.dx * Math.cos(angle) - this.dy * Math.sin(angle);
          let dy = this.dx * Math.sin(angle) + this.dy * Math.cos(angle);
          this.dx = Math.round(dx);
          this.dy = Math.round(dy);
        }
        break;
    }
  }

  calcMhtDistance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}

const ship = new Ship();

input.forEach((order) => {
  const direction = order[0];
  const num = parseInt(order.slice(1));
  ship.move(direction, num);
});

console.log(ship.calcMhtDistance());
