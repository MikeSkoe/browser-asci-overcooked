import { Entity, Cell, Guy } from '../state.js';
import { h, ElFn } from '../help/lib.js';
import drawCell from './cell/index.js';
import drawInventory from './inventory.js';

const drawMsgs = (el: ElFn) => 
	el((msgs: string[]) => h('div', {}, 
		`msgs: ${msgs.join('; ')}`,
		...msgs.map(msg => h('div', {}, msg))
	));

const draw = (
	el: ElFn
) => 
	h('div', {},
		drawCell(el),
		drawInventory(el),
		drawMsgs(el),
	);

export default draw;
