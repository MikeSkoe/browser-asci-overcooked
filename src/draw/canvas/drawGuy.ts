import { Guy } from '../../state.js';

const drawHeat = (
   ctx: CanvasRenderingContext2D, 
   x: number, 
   y: number, 
   cellSize: number, 
) => {
   ctx.save();
      ctx.arc(x - cellSize/4, y-10, 10, 0, Math.PI*.5, true);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(x, y-10, 10, 0, Math.PI*1.3, true);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(x + cellSize/4, y-10, 10, Math.PI*1.3, Math.PI*.5);
      ctx.stroke();
      ctx.lineTo(x, y);
      ctx.moveTo(x - 14, y);
      ctx.lineTo(x - 14, y + 10);
      ctx.moveTo(x - 14, y + 10);
      ctx.lineTo(x + 14, y + 10);
      ctx.moveTo(x + 14, y + 10);
      ctx.lineTo(x + 14, y);
      ctx.stroke();
   ctx.restore();
};

const drawMustage = (
   ctx: CanvasRenderingContext2D, 
   x: number, 
   y: number, 
   cellSize: number, 
   xScale = 1,
) => {
   ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, y + 17);
      ctx.lineTo(x - (15 * xScale), y + 17);
      ctx.stroke();
   ctx.restore();
};

const drawCook = (
   ctx: CanvasRenderingContext2D, 
   x: number, 
   y: number, 
   cellSize: number, 
) => {
   ctx.save();
      ctx.beginPath();
         ctx.strokeStyle = 'rgb(250, 250, 250)';
         ctx.lineWidth = 2;
         drawHeat(ctx, x, y, cellSize);
         drawMustage(ctx, x, y, cellSize);
         drawMustage(ctx, x, y, cellSize, -1);
      ctx.closePath();
   ctx.restore();
   return ctx;
}

const drawGuy = (guy: Guy, cellSize: number) => {
   return (ctx: CanvasRenderingContext2D) => {
      return drawCook(ctx, guy.x * cellSize + cellSize/2, guy.y * cellSize + cellSize/2, cellSize);
   }
}

export default drawGuy;
