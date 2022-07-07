class Snake {
  head: HTMLElement;
  //   蛇的身体，包括蛇头
  body: HTMLCollection;
  // 容器
  element: HTMLElement;
  constructor() {
    this.element = document.querySelector('.snake')!;
    this.head = document.querySelector('.snake > div')!;
    this.body = this.element.children!;
  }

  get x() {
    return this.head.offsetLeft;
  }

  get y() {
    return this.head.offsetTop;
  }

  set x(val: number) {
    if (this.x == val) return;
    this.head.style.left = val + 'px';
  }

  set y(val: number) {
    if (this.y == val) return;
    this.head.style.top = val + 'px';
  }

  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>');
  }
  moveBody() {
    for (let i = this.body.length - 1; i > 0; i--) {
      let x = (this.body[i - 1] as HTMLElement).offsetLeft;
      let y = (this.body[i - 1] as HTMLElement).offsetTop;

      (this.body[i] as HTMLElement).style.left = x + 'px';
      (this.body[i] as HTMLElement).style.top = y + 'px';
    }
  }
  checkHitBody(toX: number, toY: number, hasHead: boolean = false): boolean {
    let i = 1;
    if (hasHead) {
      i = 0;
    }
    for (; i < this.body.length; i++) {
      let x = (this.body[i] as HTMLElement).offsetLeft;
      let y = (this.body[i] as HTMLElement).offsetTop;
      if (toX == x && toY == y) return true;
    }
    return false;
  }
}

export default Snake;
