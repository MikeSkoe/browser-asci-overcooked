import { d2 } from '../../help/utils.js';
import { Guy, Cell, Entity } from '../../state.js';

const withGuy = (guy: Guy) => (cell: Cell) => {
   const [color] = cell[guy.y][guy.x]; 
   cell[guy.y][guy.x] = [color, Entity.Guy];
   return cell;
};


export default withGuy;
