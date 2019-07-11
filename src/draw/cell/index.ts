import { Cell, Guy, Thing, Color } from '../../state.js';
import { h, ElFn } from '../../help/lib.js';
import { pipe } from '../../help/utils.js';
import withGuy from './withGuy.js';
import withItems from './withItems.js';

const drawCell = (el: ElFn) => 
   el((cell: Cell, guy: Guy, items: Thing[]) => {
      const allIn = pipe(withItems(items, guy), withGuy(guy));

      return h('div', {}, 
         ...allIn(cell).map(
            entities => h('div', {},
               ...entities.map(entity => {
                  const [e, className, cutted] = entity;
                  return h('span', { 
                     className, 
                     style: {
                        textDecoration: cutted === 't' ? 'line-through' : 'none' 
                     }
                  }, e);
               })
            ))
      )
   })

export default drawCell;
