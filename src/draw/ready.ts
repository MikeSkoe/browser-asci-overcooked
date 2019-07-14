import { Item, Thing, Entity } from '../state.js';
import { h, ElFn } from '../help/lib.js';
import { compToStr } from '../help/utils.js';

const drawReady = (
	el: ElFn
) => 
   el((ready: Thing[]) => 
      h('div', {},
         'ready: ',
         ...ready.map(thing => h('div', {}, 
            thing.is
               .map(compToStr(true))
               .join(' + ')
         ))
      )
   );

export default drawReady;
