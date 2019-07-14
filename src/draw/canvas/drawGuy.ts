import { Guy } from '../../state.js';

const drawGuy = (guy: Guy) => (ctx: CanvasRenderingContext2D) => {
   ctx.fillStyle = 'rgb(200, 0, 0)';
   ctx.fillRect(guy.x * 20 + 3, guy.y * 20 + 3, 14, 14);
   return ctx;
}

export default drawGuy;
