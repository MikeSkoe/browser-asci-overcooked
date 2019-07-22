import { h, Sub } from '../../help/lib.js';
import { State } from '../../state.js';
import drawGuy from './drawGuy.js';
import drawItems from './drawItems.js';
import drawGrid from './drawGrid.js';
import { pipe } from '../../help/utils.js';

const canvas = <HTMLCanvasElement>h('canvas', {width: (26 * 2) * 5, height: (26 * 2) * 6});
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const tile = new Image();
tile.src = 'assets/tilemap.png';

const tileSize = 26;
const cellSize = 26 * 2;

const drawTile = 
   (x: number, y: number) => 
   (ctx: CanvasRenderingContext2D, tx: number, ty: number) => 
{
   ctx.drawImage(
      tile, // tile source
      x * tileSize, // source x
      y * tileSize, // source y
      tileSize, // tile size width
      tileSize, // tile size height
      tx, // target x
      ty, // target y
      cellSize, // target width
      cellSize, // target height
   )
   return ctx;
}

const drawBackground = (ctx: CanvasRenderingContext2D) => {
   ctx.save();
      ctx.fillStyle = 'rgb(150, 150, 150)';
      ctx.rect(0, 0, cellSize * 5, cellSize * 6);
      ctx.fill();
   ctx.restore();
   return ctx;
}

// TODO: everyting to line

const drawCanvas = (state: State) => {
   pipe(
      drawBackground,
      drawGrid(drawTile, state.grid, cellSize),
      drawItems(drawTile, state.items, cellSize),
      drawGuy(state.guy, cellSize),
   )(ctx);
}
const init = (sub: Sub, triggerAll) => {
   sub(['ALL'], drawCanvas);
   tile.onload = triggerAll;
   return canvas;
}
export default init;
