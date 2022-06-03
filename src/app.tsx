const body = document.body;
const game = new Game({ size: 5, enemy: { speed: .2, health: 10 } });
body.append(game.board);
