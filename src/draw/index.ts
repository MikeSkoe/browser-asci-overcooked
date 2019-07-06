import { Entity, Cell, Guy } from '../state.js';
import { h, ElFn } from '../help/lib.js';
import drawCell from './cell/index.js';
import drawInventory from './inventory.js';

const draw = (
	el: ElFn
) => 
	h('div', {},
		drawCell(el),
		drawInventory(el),
	);

export default draw;
