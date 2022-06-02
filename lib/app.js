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
    health;
    interval;
    pathIndex = 0;
    constructor(options = {}) {
        for (const key in defaultEnemyOptions)
            if (!options.hasOwnProperty(key))
                options[key] = defaultEnemyOptions[key];
        const { health, speed } = options;
        this.health = health;
        this.element = El("div", { class: 'enemy' });
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
            this.element.remove();
    }
}
const defaultGameOptions = { size: 10 };
class Game {
    board;
    spawn;
    path;
    constructor(options = {}) {
        for (const key in defaultGameOptions)
            if (!options.hasOwnProperty(key))
                options[key] = defaultGameOptions[key];
        this.board = El(Board, { options: options });
        this.path = [
            ...[...this.board.querySelectorAll('.row:not(:first-child)>:first-child')].reverse(),
            ...this.board.querySelectorAll('.row:first-child>.path'),
            ...this.board.querySelectorAll('.row:not(:first-child)>:last-child')
        ];
        this.spawn = this.path[0];
    }
    spawnEnemy() {
        const enemy = new Enemy();
    }
}
const body = document.body;
const game = new Game({ size: 5 });
body.append(game.board);
