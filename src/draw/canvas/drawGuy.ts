import { Guy } from '../../state.js';

const drawGuy = (ctx: CanvasRenderingContext2D) => (guy: Guy) => {
   ctx.fillStyle = 'rgb(200, 0, 0)';
   ctx.fillRect(guy.x * 20 + 3, guy.y * 20 + 3, 14, 14);
}

export default drawGuy;
