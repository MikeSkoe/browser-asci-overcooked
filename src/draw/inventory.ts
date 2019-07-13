import { Item, Thing, Entity } from '../state.js';
import { h, ElFn } from '../help/lib.js';

const drawInventory = (
	el: ElFn
) => 
   el((guy_inHand: [Item] | [], items: Thing[]) => {
      const [item] = guy_inHand;
      let name: string;
      if (item) {
         name = items.find(i => i.id === item).is.map(
            comp => {
               switch (comp.entity) {
                     case Entity.Meet: return 'meet'; break;
                     case Entity.Bun: return 'bun'; break;
               }
            }
         ).join(' + ');
      } else {
         name = 'nothing';
      }
      return h('div', {},
         `you keep: ${name}`,
      )
   })

export default drawInventory;
