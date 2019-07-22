import { Item, Thing } from '../state.js';
import { h, ElFn } from '../help/lib.js';
import { compToStr } from '../help/utils.js';

const drawInventory = (
	el: ElFn
) => 
   el((guy_inHand: [string] | [], items: Thing[]) => {
      const [inHandId] = guy_inHand;
      const item = items.find(i => i.id === inHandId);
      const name: string = item
         ? item.is
            .map(compToStr(true))
            .join(' + ')
         : 'nothing'
      return h('div', {},
         `you keep: ${name}`,
      )
   })

export default drawInventory;
