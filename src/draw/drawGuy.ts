import { d2 } from '../help/utils.js';
import { Guy, Cell } from '../state.js';

const drawGuy = (guy: Guy) => (cell: Cell) => {
	const width = cell[0].length;
    const flatCell = cell.flat();
    const res = d2<number>([...flatCell], width);
    res[guy.y][guy.x] = 7;
    return res;
};

export default drawGuy;
