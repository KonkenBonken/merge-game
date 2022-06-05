type GameOptions = { size: number, playerHealth: number, enemy: EnemyOptions };

class Game {
  board: HTMLElement;
  spawn: HTMLElement;
  path: HTMLElement[];
  options: GameOptions;
  playerHealth: number;

  constructor(options: GameOptions) {
    this.options = options;

    this.playerHealth = this.options.playerHealth;

    this.board = <Board options={this.options} />;
    this.path = [
      ...[...this.board.querySelectorAll('.row:not(:first-child)>:first-child')].reverse(),
      ...this.board.querySelectorAll('.row:first-child>.path'),
      ...this.board.querySelectorAll('.row:not(:first-child)>:last-child')
    ] as HTMLElement[];
    this.spawn = this.path[0];

    this.path.forEach((tile: Element & { hit?: () => void }) => {
      tile.hit = () =>
        tile.querySelectorAll('.enemy').forEach((element: Element & { enemy?: Enemy }) =>
          element.enemy ?.hit()
        );
      tile.addEventListener('click', tile.hit);
    });

    setTimeout(() => this.start(), 2000);
  }

  start(enemyDelay = this.options.enemy.delay) {
    const spawn = () => {
      this.spawnEnemy(this.options.enemy);
      setTimeout(() => spawn(), enemyDelay * 1000 * (Math.random() * 1.5 + .25));
    };
    spawn();
  }

  spawnEnemy(options: EnemyOptions) {
    const enemy = new Enemy(options);
  }

  damage(damage = 1) {
    this.playerHealth -= damage;
  }
}
