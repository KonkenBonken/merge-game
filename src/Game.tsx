const defaultGameOptions = { size: 10 };

type GameOptions = typeof defaultGameOptions; // All required

class Game {
  board: HTMLElement;
  spawn: HTMLElement;
  path: HTMLElement[];

  constructor(options: GameOptions | {} = {}) {
    for (const key in defaultGameOptions)
      if (!options.hasOwnProperty(key))
        options[key] = defaultGameOptions[key];

    this.board = <Board options={options as GameOptions} />;
    this.path = [
      ...[...this.board.querySelectorAll('.row:not(:first-child)>:first-child')].reverse(),
      ...this.board.querySelectorAll('.row:first-child>.path'),
      ...this.board.querySelectorAll('.row:not(:first-child)>:last-child')
    ] as HTMLElement[];
    this.spawn = this.path[0];

    this.path.forEach(tile =>
      tile.addEventListener('click', () =>
        tile.querySelectorAll('.enemy').forEach(enemy =>
          // @ts-expect-error
          enemy.enemy.hit()
        )));

    setTimeout(() => this.start(), 2000);
  }

  start(enemyDelay = 5) {
    const spawn = () => {
      this.spawnEnemy();
      setTimeout(() => spawn(), enemyDelay * 1000 * (Math.random() * 1.5 + .25));
    };
    spawn();
  }

  spawnEnemy() {
    const enemy = new Enemy();
  }
}
