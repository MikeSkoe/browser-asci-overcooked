import { Grid, Surface } from '../../state.js';

const drawGrid = (drawTile, grid: Grid, cellSize: number) => {
   const drawTable = drawTile(2, 0);
   const drawCutting = drawTile(3, 0);
   const drawStove = drawTile(2, 1);
   const drawBuns = drawTile(3, 2);
   const drawMeats = drawTile(1, 2);
   const drawGarbage = drawTile(2, 2);
   const drawReady = drawTile(0, 2);

   return (ctx: CanvasRenderingContext2D) => {

      for (let y = 0; y < grid.length; y++) {
         for (let x = 0; x < grid[y].length; x++) {
            const [surface] = grid[y][x];
            switch (surface) {
               case Surface.Cutting: 
               case Surface.Plates: 
                  drawCutting(ctx, x * cellSize, y * cellSize);
                  break;
               case Surface.Stove: 
                  drawStove(ctx, x * cellSize, y * cellSize);
                  break;
               case Surface.Table: 
               case Surface.Greens: 
                  drawTable(ctx, x * cellSize, y * cellSize);
                  break;
               case Surface.Buns: 
                  drawBuns(ctx, x * cellSize, y * cellSize);
                  break;
               case Surface.Meats: 
                  drawMeats(ctx, x * cellSize, y * cellSize);
                  break;
                  drawMeats(ctx, x * cellSize, y * cellSize);
                  break;
               case Surface.Garbage: 
                  drawGarbage(ctx, x * cellSize, y * cellSize);
                  break;
               case Surface.Ready: 
                  drawReady(ctx, x * cellSize, y * cellSize);
                  break;
            }
         }
      }
      return ctx;
   }
}

export default drawGrid;
