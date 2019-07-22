import { Grid, Surface } from '../../state.js';

const drawTable = (
   color: string
) => (
   ctx: CanvasRenderingContext2D, 
   x: number, 
   y: number, 
   cellSize: number, 
) => {
   ctx.save();
      ctx.beginPath();
         ctx.strokeStyle = 'rgb(0, 0, 0)';
         ctx.lineWidth = 2;
         ctx.strokeStyle = color;
         ctx.rect(x + 10, y + 10, cellSize - 20, cellSize - 20);
         ctx.stroke();
      ctx.closePath();
   ctx.restore();
}

const drawTableShadow = (ctx: CanvasRenderingContext2D, x, y, cellSize) => {
   ctx.beginPath();
      ctx.moveTo(x + 15, y + cellSize - 5);
      ctx.lineTo(x + cellSize - 5, y + cellSize - 5);
      ctx.lineTo(x + cellSize - 5, y + 15);
      ctx.stroke();
   ctx.closePath();
}

const drawGrid = (drawTile, grid: Grid, cellSize: number) => {
   const drawSimple = drawTable('rgb(0, 0, 0)');
   const drawCutting = drawTable('rgb(0, 0, 0)');
   const drawStove = drawTable('rgb(0, 0, 0)');
   const drawBuns = drawTable('rgb(0, 0, 0)');
   const drawMeats = drawTable('rgb(0, 0, 0)');
   const drawGarbage = drawTable('rgb(0, 0, 0)');
   const drawReady = drawTable('rgb(0, 0, 0)');

   return (ctx: CanvasRenderingContext2D) => {
      ctx.save();

      for (let yy = 0; yy < grid.length; yy++) {
         for (let xx = 0; xx < grid[yy].length; xx++) {
            const [surface] = grid[yy][xx];
            const x = xx * cellSize;
            const y = yy * cellSize;
            switch (surface) {
               case Surface.Cutting: 
               case Surface.Plates: 
                  drawCutting(ctx, x, y, cellSize);
                  drawTableShadow(ctx, x, y, cellSize);
                  break;
               case Surface.Stove: 
                  drawStove(ctx, x, y, cellSize);
                  drawTableShadow(ctx, x, y, cellSize);
                  break;
               case Surface.Table: 
               case Surface.Greens: 
                  drawSimple(ctx, x, y, cellSize);
                  drawTableShadow(ctx, x, y, cellSize);
                  break;
               case Surface.Buns: 
                  drawBuns(ctx, x, y, cellSize);
                  drawTableShadow(ctx, x, y, cellSize);
                  break;
               case Surface.Meats: 
                  drawMeats(ctx, x, y, cellSize);
                  drawTableShadow(ctx, x, y, cellSize);
                  break;
                  drawMeats(ctx, x, y, cellSize);
                  drawTableShadow(ctx, x, y, cellSize);
                  break;
               case Surface.Garbage: 
                  drawGarbage(ctx, x, y, cellSize);
                  drawTableShadow(ctx, x, y, cellSize);
                  break;
               case Surface.Ready: 
                  drawReady(ctx, x, y, cellSize);
                  drawTableShadow(ctx, x, y, cellSize);
                  break;
            }
         }
      }
      ctx.restore();
      return ctx;
   }
}

export default drawGrid;
