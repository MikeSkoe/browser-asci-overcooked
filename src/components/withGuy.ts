import { d2 } from '../help/utils.js';
import { Guy, Cell, Grid } from '../state.js';

const withGuy = (guy: Guy, grid: Grid) => (cell: Cell) => {
    const flatCell = cell.flat();
    const res = d2<number>([...flatCell], grid.width);
    res[guy.y][guy.x] = 7;
    return res;
};

export default withGuy;