import { d2 } from '../help/utils.js';
const drawGuy = (guy) => (cell) => {
    const width = cell[0].length;
    const flatCell = cell.flat();
    const res = d2([...flatCell], width);
    res[guy.y][guy.x] = 7;
    return res;
};
export default drawGuy;
//# sourceMappingURL=withGuy.js.map