import { Item, Thing, Entity } from '../state.js';
import { h, ElFn } from '../help/lib.js';
import { compToStr } from '../help/utils.js';

const drawNeed = (
	el: ElFn
) => 
   el((need: Thing[]) => 
      h('div', {},
         'need: ',
         ...need.map(thing => h('div', {}, 
            thing.is
               .map(compToStr(true))
               .join(' + ')
         ))
      )
   );

export default drawNeed;
