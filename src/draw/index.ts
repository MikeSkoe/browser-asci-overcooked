import { h, ElFn, Sub, Pub } from '../help/lib.js';
import drawMsgs from './msgs/index.js';
import drawInventory from './inventory.js';
import drawReady from './ready.js';
import drawNeed from './need.js';
import InitCanvas  from './canvas/index.js';

const draw = (
   el: ElFn,
   sub: Sub,
   pub: Pub,
) => {

   const triggerAll = pub(['ALL'], state => state);
   const canvas = InitCanvas(sub, triggerAll);

	return h('div', {},
      canvas,
      drawInventory(el),
      drawReady(el),
      drawNeed(el),
      drawMsgs(el),
	);
}

export default draw;
