import { Grid, Surface } from '../../state.js';

const drawGrid = (drawTile, grid: Grid) => {
   const table = drawTile(2, 0);
   const cutting = drawTile(3, 0);
   const stove = drawTile(2, 1);
   const buns = drawTile(0, 2);
   const meats = drawTile(1, 2);
   const garbage = drawTile(2, 2);
   const ready = drawTile(3, 2);

   return (ctx: CanvasRenderingContext2D) => {
      const drawTable = table(ctx);
      const drawCutting = cutting(ctx);
      const drawStove = stove(ctx);
      const drawBuns = buns(ctx);
      const drawMeats = meats(ctx);
      const drawGarbage = garbage(ctx);
      const drawReady = ready(ctx);
      for (let y = 0; y < grid.length; y++) {
         for (let x = 0; x < grid[y].length; x++) {
            const [surface] = grid[y][x];
            switch (surface) {
               case Surface.Floor: 
                  ctx.fillStyle = `rgb(250, 250, 250)`;
                  ctx.fillRect(x * 26, y * 26, 26, 26);
                  break;
               case Surface.Cutting: 
                  drawCutting(x * 26, y * 26, 26, 26);
                  break;
               case Surface.Stove: 
                  drawStove(x * 26, y * 26, 26, 26);
                  break;
               case Surface.Table: 
                  drawTable(x * 26, y * 26, 26, 26);
                  break;
               case Surface.Buns: 
                  drawBuns(x * 26, y * 26, 26, 26);
                  break;
               case Surface.Meats: 
                  drawMeats(x * 26, y * 26, 26, 26);
                  break;
               case Surface.Garbage: 
                  drawGarbage(x * 26, y * 26, 26, 26);
                  break;
               case Surface.Ready: 
                  drawReady(x * 26, y * 26, 26, 26);
                  break;
            }
         }
      }
      return ctx;
   }
}

export default drawGrid;
