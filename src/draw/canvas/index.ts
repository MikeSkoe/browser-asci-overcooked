import { h, Sub } from '../../help/lib.js';
import { State } from '../../state.js';
import drawGuy from './drawGuy.js';
import drawItems from './drawItems.js';
import drawGrid from './drawGrid.js';
import { pipe } from '../../help/utils.js';

const canvas = <HTMLCanvasElement>h('canvas', {width: 100, height: 120});
const ctx = canvas.getContext('2d');

const drawCanvas = (state: State) => {
   pipe(
      drawGrid(state.grid),
      drawItems(state.items),
      drawGuy(state.guy),
   )(ctx);
}

const init = (sub: Sub) => {
   sub(['ALL'], drawCanvas);
   return canvas;
}

export default init;
