import { Guy } from '../../state.js';

const drawGuy = (drawTile, guy: Guy) => {
   const drawGuy = drawTile(4, 1);
   return (ctx: CanvasRenderingContext2D) => {
      return drawGuy(ctx)(guy.x * 26, guy.y * 26, 26, 26);
   }
}

export default drawGuy;
