"use strict";
function Board(props) {
    const { options } = props;
    return (El("div", { class: 'board' }, Array(options.size).fill(0).map(() => El("div", { class: 'grid' }))));
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
const defaultGameOptions = { size: 10 };
;
class Game {
    board;
    constructor(options = {}) {
        for (const key in defaultGameOptions)
            if (!options.hasOwnProperty(key))
                options[key] = defaultGameOptions[key];
        this.board = El(Board, { options: options });
    }
}
const body = document.body;
const game = new Game({ size: 10 });
body.append(game.board);
