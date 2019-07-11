import { minMax } from '../../help/utils.js';
import { Guy, Cell, Entity, Thing } from '../../state.js';

const withItems = (items: Thing[]) => (cell: Cell) => {
   items.forEach(i => {
      if (i.x >= 0 && i.y >= 0) {
         const [color] = cell[i.y][i.x]; 
         cell[i.y][i.x] = [color, i.id];
      }
   });
   return cell;
};


export default withItems;
