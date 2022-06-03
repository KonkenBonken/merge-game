"use strict";
function elements(amount, element) {
    return Array(amount).fill(0).map(() => element.cloneNode(true));
}
function Board(props) {
    const { options } = props;
    return (El("div", { class: 'board' },
        El("div", { class: 'row' }, elements(options.size + 2, El("div", { class: 'path' }))),
        elements(options.size, El("div", { class: 'row' },
            El("div", { class: 'path' }),
            elements(options.size, El("div", { class: 'tile' })),
            El("div", { class: 'path' })))));
}
function El(tagName, attrs = {}, ...children) {
    if (typeof tagName !== 'string')
        return tagName(attrs);
    const elem = document.createElement(tagName);
    for (const [key, value] of Object.entries(attrs))
        if (key === 'class')
            elem.classList.add(...value.split(' '));
        else {
            elem[key] = value;
            elem.setAttribute(key, value);
        }
    for (const child of children)
        if (Array.isArray(child))
            elem.append(...child);
        else
            elem.append(child);
    return elem;
}
;
const defaultEnemyOptions = { speed: 1, health: 5 };
class Enemy {
    element;
    _health = 0;
    fullHealth = 0;
    interval;
    pathIndex = 0;
    get health() { return this._health; }
    set health(value) {
        this._health = value;
        this.element.style.setProperty('--health', (this.health / this.fullHealth).toFixed(2));
        this.element.setAttribute('health', this.health.toString());
    }
    constructor(options = {}) {
        for (const key in defaultEnemyOptions)
            if (!options.hasOwnProperty(key))
                options[key] = defaultEnemyOptions[key];
        const { health, speed } = options;
        this.element = El("div", { class: 'enemy' });
        this.health = this.fullHealth = health;
        game.path[this.pathIndex++].append(this.element);
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
            this.kill();
    }
    kill() {
        clearInterval(this.interval);
        this.element.remove();
    }
}
const defaultGameOptions = { size: 10, enemy: {} };
class Game {
    board;
    spawn;
    path;
    options;
    constructor(options = {}) {
        for (const key in defaultGameOptions)
            if (!options.hasOwnProperty(key))
                options[key] = defaultGameOptions[key];
        this.options = options;
        this.board = El(Board, { options: this.options });
        this.path = [
            ...[...this.board.querySelectorAll('.row:not(:first-child)>:first-child')].reverse(),
            ...this.board.querySelectorAll('.row:first-child>.path'),
            ...this.board.querySelectorAll('.row:not(:first-child)>:last-child')
        ];
        this.spawn = this.path[0];
        this.path.forEach(tile => tile.addEventListener('click', () => tile.querySelectorAll('.enemy').forEach((element) => element.enemy.hit())));
        setTimeout(() => this.start(), 2000);
    }
    start(enemyDelay = 5) {
        const spawn = () => {
            this.spawnEnemy(this.options.enemy);
            setTimeout(() => spawn(), enemyDelay * 1000 * (Math.random() * 1.5 + .25));
        };
        spawn();
    }
    spawnEnemy(options) {
        const enemy = new Enemy(options);
    }
}
const body = document.body;
const game = new Game({ size: 5, enemy: { speed: .2, health: 10 } });
body.append(game.board);
