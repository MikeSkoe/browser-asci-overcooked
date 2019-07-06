import { h } from '../help/lib.js';
import { pipe } from '../help/utils.js';
import withGuy from './withGuy.js';
import withItems from './withItems.js';
const drawCell = (el) => el((cell, guy, items) => {
    const allIn = pipe(withItems(items, guy), withGuy(guy));
    return h('div', {}, ...allIn(cell)
        .map(entities => h('div', {}, ...entities.map(entity => {
        const [e, className] = entity;
        return h('span', { className }, e);
    }))));
});
export default drawCell;
//# sourceMappingURL=cell.js.map