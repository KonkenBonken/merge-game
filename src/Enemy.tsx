const defaultEnemyOptions = { speed: 1, health: 5 };

type EnemyOptions = typeof defaultEnemyOptions; // All required

class Enemy {
  element: HTMLElement;
  health: number;
  interval: number;
  pathIndex: number = 0;

  constructor(options: EnemyOptions | {} = {}) {
    for (const key in defaultEnemyOptions)
      if (!options.hasOwnProperty(key))
        options[key] = defaultEnemyOptions[key];

    const { health, speed } = options as EnemyOptions;

    this.health = health;
    this.element = <div class='enemy' style=`--health:${health}` />;
    game.path[this.pathIndex++].append(this.element);
    // @ts-expect-error
    this.element.enemy = this;

    this.interval = setInterval(() => this.walk(), 1000 / speed);
  }

  walk() {
    if (game.path[this.pathIndex])
      game.path[this.pathIndex++].append(this.element);
    else
      this.element.remove();
  }

  hit(damage = 1) {
    this.health -= damage;
    if (!this.health)
      this.kill()
  }
  kill() {
    clearInterval(this.interval);
    this.element.remove();
  }
}
