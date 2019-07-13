import { h, ElFn, Sub } from '../help/lib.js';
import drawCell from './cell/index.js';
import drawMsgs from './msgs/index.js';
import drawInventory from './inventory.js';
import InitCanvas  from './canvas/index.js';

const draw = (
   el: ElFn,
   sub: Sub,
) => {
   const canvas = InitCanvas(sub);

	return h('div', {},
      canvas,
      //drawCell(el),
      drawInventory(el),
      drawMsgs(el),
	);
}

export default draw;
