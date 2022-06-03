const defaultGameOptions = { size: 10, enemy: {} as EnemyOptions };

type GameOptions = typeof defaultGameOptions; // All required

class Game {
  board: HTMLElement;
  spawn: HTMLElement;
  path: HTMLElement[];
  options: GameOptions;

  constructor(options: GameOptions | {} = {}) {
    for (const key in defaultGameOptions)
      if (!options.hasOwnProperty(key))
        options[key] = defaultGameOptions[key];

    this.options = options as GameOptions;

    this.board = <Board options={this.options} />;
    this.path = [
      ...[...this.board.querySelectorAll('.row:not(:first-child)>:first-child')].reverse(),
      ...this.board.querySelectorAll('.row:first-child>.path'),
      ...this.board.querySelectorAll('.row:not(:first-child)>:last-child')
    ] as HTMLElement[];
    this.spawn = this.path[0];

    this.path.forEach(tile =>
      tile.addEventListener('click', () =>
        // @ts-expect-error
        tile.querySelectorAll('.enemy').forEach((element: Element & { enemy: Enemy }) =>
          element.enemy.hit()
        )));

    setTimeout(() => this.start(), 2000);
  }

  start(enemyDelay = 5) {
    const spawn = () => {
      this.spawnEnemy(this.options.enemy);
      setTimeout(() => spawn(), enemyDelay * 1000 * (Math.random() * 1.5 + .25));
    };
    spawn();
  }

  spawnEnemy(options: EnemyOptions) {
    const enemy = new Enemy(options);
  }
}
