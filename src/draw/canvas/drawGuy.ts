import { Guy } from '../../state.js';

const drawGuy = (drawTile, guy: Guy, cellSize: number) => {
   const drawGuy = drawTile(4, 1);
   return (ctx: CanvasRenderingContext2D) => {
      return drawGuy(ctx, guy.x * cellSize, guy.y * cellSize);
   }
}

export default drawGuy;
