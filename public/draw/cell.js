import { pipe } from "../help/utils.js";
import withGuy from "../components/withGuy.js";
import { Entities } from "../state.js";
const convertToChars = (n) => {
    switch (n) {
        case Entities.Wall: return '#';
        case Entities.Guy: return '@';
        default: return '.';
    }
};
const draw = h => (cell, guy) => {
    const modify = pipe(withGuy(guy));
    return h('div', {}, ...modify(cell).map(nums => h('div', {}, h('span', {}, nums.map(convertToChars).join('')))));
};
export default draw;
//# sourceMappingURL=cell.js.map