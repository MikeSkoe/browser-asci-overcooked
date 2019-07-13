import { minMax } from '../../help/utils.js';
import { Guy, Grid, Entity, Thing } from '../../state.js';

const withItems = (items: Thing[]) => (grid: Grid) => {
   items.forEach(i => {
      if (i.x >= 0 && i.y >= 0) {
         const color = grid[i.y][i.x]; 
         grid[i.y][i.x] = color;
      }
   });
   return grid;
};


export default withItems;
