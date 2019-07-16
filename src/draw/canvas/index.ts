import { h, Sub } from '../../help/lib.js';
import { State } from '../../state.js';
import drawGuy from './drawGuy.js';
import drawItems from './drawItems.js';
import drawGrid from './drawGrid.js';
import { pipe } from '../../help/utils.js';

const canvas = <HTMLCanvasElement>h('canvas', {width: 26 * 5, height: 26 * 6});
const ctx = canvas.getContext('2d');

const tile = new Image();
tile.src = 'assets/tilemap.png';

const tileSize = 26;

const drawTile = (x: number, y: number) => 
   (ctx: CanvasRenderingContext2D) => 
   (tx: number, ty: number, tw: number, th: number) => 
{
   ctx.drawImage(
      tile, // tile source
      x * tileSize, // source x
      y * tileSize, // source y
      tileSize, // tile size width
      tileSize, // tile size height
      tx, // target x
      ty, // target y
      tw, // target width
      th, // target height
   )
   return ctx;
}

const drawCanvas = (state: State) => {
   pipe(
      drawGrid(drawTile, state.grid),
      drawItems(state.items),
      drawGuy(drawTile, state.guy),
   )(ctx);
}

const init = (sub: Sub) => {
   sub(['ALL'], drawCanvas);
   return canvas;
}

export default init;
