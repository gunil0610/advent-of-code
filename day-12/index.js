const fs = require('fs');

const input = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r')
  .join('')
  .split('\n')
  .filter((x) => x);

class Ship {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = 0;
  }

  moveForward(num) {
    switch (this.direction) {
      case 0:
        this.x += num;
        break;
      case 180:
        this.x -= num;
        break;
      case 270:
        this.y += num;
        break;
      case 90:
        this.y -= num;
        break;
    }
  }

  move(dir, num) {
    switch (dir) {
      case 'N':
        this.y += num;
        break;
      case 'S':
        this.y -= num;
        break;
      case 'E':
        this.x += num;
        break;
      case 'W':
        this.x -= num;
        break;
    }
  }

  turn(dir, deg) {
    if (dir === 'R') {
      this.direction += deg;
    } else if (dir === 'L') {
      this.direction -= deg;
    }
    if (this.direction >= 360) {
      this.direction -= 360;
    } else if (this.direction < 0) {
      this.direction += 360;
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
  console.log(direction, num);
  switch (direction) {
    case 'F':
      ship.moveForward(num);
    case 'N':
    case 'S':
    case 'E':
    case 'W':
      ship.move(direction, num);
    case 'L':
    case 'R':
      ship.turn(direction, num);
  }
});

console.log(ship.calcMhtDistance());
