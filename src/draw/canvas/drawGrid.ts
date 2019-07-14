import { Grid, Surface } from '../../state.js';

const drawGrid = (grid: Grid) => (ctx: CanvasRenderingContext2D) => {
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         const [surface] = grid[y][x];
         switch (surface) {
            case Surface.Floor: 
               ctx.fillStyle = `rgb(250, 250, 250)`;
               break;
            case Surface.Cutting: 
               ctx.fillStyle = `rgb(200, 200, 200)`;
               break;
            case Surface.Stove: 
               ctx.fillStyle = `rgb(180, 180, 180)`;
               break;
            case Surface.Table: 
               ctx.fillStyle = `rgb(120, 120, 120)`;
               break;
            case Surface.Buns: 
               ctx.fillStyle = `rgb(100, 100, 100)`;
               break;
            case Surface.Meats: 
               ctx.fillStyle = `rgb(50, 50, 50)`;
               break;
            case Surface.Garbage: 
               ctx.fillStyle = `rgb(0, 0, 0)`;
               break;
            case Surface.Ready: 
               ctx.fillStyle = `rgb(100, 50, 0)`;
               break;
         }
         ctx.fillRect(x * 20, y * 20, 20, 20);
      }
   }
   return ctx;
}

export default drawGrid;
