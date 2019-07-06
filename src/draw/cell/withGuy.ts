import { d2 } from '../../help/utils.js';
import { Guy, Cell, Entity } from '../../state.js';

const withGuy = (guy: Guy) => (cell: Cell) => {
    cell[guy.y][guy.x] = Entity.Guy;
    return cell;
};

export default withGuy;
