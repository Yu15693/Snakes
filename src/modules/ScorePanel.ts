class ScorePanel {
  score = 0;
  level = 1;

  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  maxLevel: number;
  upScore: number;
  constructor(maxLevel = 10, upScore = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.querySelector('.score')!;
    this.levelEle = document.querySelector('.level')!;
  }

  addScore() {
    this.score++;
    this.scoreEle.innerText = this.score + '';
    if (this.score % this.upScore == 0) this.addLevel();
  }

  addLevel() {
    if (this.level >= 10) return;
    this.level++;
    this.levelEle.innerText = this.level + '';
  }
}

export default ScorePanel;
