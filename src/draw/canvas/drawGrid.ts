import { Grid, Color } from '../../state.js';

const drawGrid = (ctx: CanvasRenderingContext2D) => (grid: Grid) => {
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         const color = grid[y][x];
         switch (color) {
            case Color.White: 
               ctx.fillStyle = `rgb(200, 200, 200)`;
               break;
            case Color.Gray: 
               ctx.fillStyle = `rgb(100, 100, 100)`;
               break;
            case Color.Black: 
               ctx.fillStyle = `rgb(10, 10, 10)`;
               break;
         }
         ctx.fillRect(x * 20, y * 20, 20, 20);
      }
   }
}

export default drawGrid;
