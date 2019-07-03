import { d2 } from '../help/utils.js';
const withGuy = (guy) => (cell) => {
    const flatCell = cell.flat();
    const res = d2([...flatCell], 5);
    res[guy.y][guy.x] = 7;
    return res;
};
export default withGuy;
//# sourceMappingURL=withGuy.js.map