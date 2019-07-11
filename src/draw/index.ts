import { Entity, Cell, Guy } from '../state.js';
import { h, ElFn } from '../help/lib.js';
import drawCell from './cell/index.js';
import drawMsgs from './msgs/index.js';
import drawInventory from './inventory.js';

const draw = (
	el: ElFn
) => 
	h('div', {},
		drawCell(el),
		drawInventory(el),
		drawMsgs(el),
	);

export default draw;
