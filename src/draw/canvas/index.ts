import { h, Sub } from '../../help/lib.js';
import { State } from '../../state.js';
import drawGuy from './drawGuy.js';
import drawItems from './drawItems.js';
import drawGrid from './drawGrid.js';

const canvas = <HTMLCanvasElement>h('canvas', {width: 100, height: 100});
const ctx = canvas.getContext('2d');

const guy = drawGuy(ctx);
const items = drawItems(ctx);
const grid = drawGrid(ctx);

const drawCanvas = (state: State) => {
   grid(state.grid);
   items(state.items);
   guy(state.guy);
}

const init = (sub: Sub) => {
   sub(['ALL'], drawCanvas);
   return canvas;
}

export default init;
