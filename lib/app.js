"use strict";
function Board(props) {
    const size = props && props.size || 10;
    return (El("div", { class: 'board' }, Array(size).fill(0).map(() => El("div", { class: 'grid' }))));
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
const body = document.body;
const board = El(Board, null);
body.append(board);
