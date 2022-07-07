import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  direction: string = '';
  isLive = true;

  width: number;
  height: number;
  constructor(width = 300, height = 300) {
    this.width = width;
    this.height = height;
    this.snake = new Snake();
    this.food = new Food(width, height);
    this.scorePanel = new ScorePanel(10, 2);

    this.init();
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.move();
    // setInterval(this.move.bind(this), 1000)
  }
  keydownHandler(event: KeyboardEvent) {
    const keys = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
    const HKeys = ['ArrowLeft', 'ArrowRight'];
    const Vkeys = ['ArrowUp', 'ArrowDown'];
    if (keys.includes(event.key)) {
      if (this.snake.body.length > 1) {
        if (HKeys.includes(event.key) && HKeys.includes(this.direction)) return;
        if (Vkeys.includes(event.key) && Vkeys.includes(this.direction)) return;
      }
      this.direction = event.key;
    }
  }
  move() {
    let x = this.snake.x;
    let y = this.snake.y;

    switch (this.direction) {
      //上
      case 'ArrowUp':
        y -= 10;
        break;
      //下
      case 'ArrowDown':
        y += 10;
        break;
      //左
      case 'ArrowLeft':
        x -= 10;
        break;
      //右
      case 'ArrowRight':
        x += 10;
        break;
    }
    if (x < 0 || x >= this.width || y >= this.height || y < 0) {
      this.gameover('蛇撞墙了');
      return;
    }
    this.checkEatFood();
    this.snake.moveBody();
    if (this.snake.checkHitBody(x, y)) {
      this.gameover('蛇撞到身体了');
      return;
    }
    this.snake.x = x;
    this.snake.y = y;

    this.isLive &&
      setTimeout(this.move.bind(this), 80 - (this.scorePanel.level - 1) * 8);
  }
  gameover(msg: string) {
    this.isLive = false;
    alert(msg + ' GameOver');
  }

  checkEat(x: number, y: number): boolean {
    if (x == this.food.x && y == this.food.y) return true;
    return false;
  }
  checkEatFood() {
    if (this.checkEat(this.snake.x, this.snake.y)) {
      console.log('吃到食物了');
      do {
        this.food.change();
      } while (this.snake.checkHitBody(this.food.x, this.food.y, true));
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  }
}

export default GameControl;
