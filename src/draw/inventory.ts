import { Item, Thing, Entity } from '../state.js';
import { h, ElFn } from '../help/lib.js';

const drawInventory = (
	el: ElFn
) => 
   el((guy_inHand: [Item] | [], items: Thing[]) => {
      const [item] = guy_inHand;
      let name: string;
      if (item) {
         const is = items.find(i => i.id === item).is;
         switch (is) {
               case Entity.Meet: name = 'meet'; break;
         }
      } else {
         name = 'nothing';
      }
      return h('div', {},
         `you keep: ${name}`,
      )
   })

export default drawInventory;
