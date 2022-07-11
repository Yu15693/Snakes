class Food {
  element: HTMLElement;

  width: number;
  height: number;

  constructor(width = 300, height = 300) {
    this.width = width;
    this.height = height;
    this.element = document.querySelector('.food')!;
  }

  get x() {
    return this.element.offsetLeft;
  }

  get y() {
    return this.element.offsetTop;
  }

  change() {
    let x = Math.round((Math.random() * (this.width - 20)) / 10) * 10 + 10;
    let y = Math.round((Math.random() * (this.width - 20)) / 10) * 10 + 10;
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
  }
}

export default Food;
