type EnemyOptions = {
  speed: number, health: number, delay: number
};

class Enemy {
  element: HTMLElement;
  _health: number = 0;
  fullHealth: number = 0;
  interval: number;
  pathIndex: number = 0;

  get health() { return this._health }
  set health(value) {
    this._health = value;
    this.element.style.setProperty('--health', (this.health / this.fullHealth).toFixed(2));
    this.element.setAttribute('health', this.health.toString());
  }

  constructor(options: EnemyOptions) {
    const { health, speed } = options;

    this.element = <div class='enemy' />;
    this.health = this.fullHealth = health;
    game.path[this.pathIndex++].append(this.element);
    // @ts-expect-error
    this.element.enemy = this;

    this.interval = setInterval(() => this.walk(), 1000 / speed);
  }

  walk() {
    if (game.path[this.pathIndex])
      game.path[this.pathIndex++].append(this.element);
    else
      this.score();
  }

  hit(damage = 1) {
    this.health -= damage;
    if (!this.health)
      this.kill()
  }

  score() {
    game.damage();
    this.kill();
  }

  kill() {
    clearInterval(this.interval);
    this.element.remove();
  }
}
