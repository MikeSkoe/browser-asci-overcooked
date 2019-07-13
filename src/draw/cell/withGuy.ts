import { d2 } from '../../help/utils.js';
import { Guy, Grid, Entity } from '../../state.js';

const withGuy = (guy: Guy) => (grid: Grid) => {
   const color = grid[guy.y][guy.x]; 
   grid[guy.y][guy.x] = color;
   return grid;
};


export default withGuy;
