import { d2 } from '../help/utils.js';
import { Guy, Cell } from '../state.js';

const withGuy = (guy: Guy) => (cell: Cell) => {
    const flatCell = cell.flat();
    const res = d2<number>([...flatCell], 5);
    res[guy.y][guy.x] = 7;
    return res;
};

export default withGuy;