const defaultGameOptions: GameOptions = { size: 10 };

interface GameOptions {
  size?: number;
};

class Game {
  board: HTMLElement;

  constructor(options: GameOptions = {}) {
    for (const key in defaultGameOptions)
      if (!options.hasOwnProperty(key))
        options[key] = defaultGameOptions[key];

    this.board = <Board options={options} />;
  }
}
