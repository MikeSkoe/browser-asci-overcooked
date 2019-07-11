import { Entity, Cell, Guy, Thing, Color } from '../../state.js';
import { h, ElFn } from '../../help/lib.js';
import { pipe } from '../../help/utils.js';
import withGuy from './withGuy.js';
import withItems from './withItems.js';

const drawCell = (el: ElFn) => 
   el((cell: Cell, guy: Guy, items: Thing[]) => {
      const allIn = pipe(
         withItems(items), 
         withGuy(guy)
      );

      return h('div', {}, 
         ...allIn(cell).map(
            entities => h('div', {},
               ...entities.map(([color, entity]) => {
                  const item = items.find(i => i.id === entity);
                  return h('span', 
                     {
                        className: color,
                        style: {
                           textDecoration: item && item.cutted === 5 ? 'line-through' : ''
                        },
                     },
                     item ? item.is : entity
                  );
               })
            ))
      )
   })

export default drawCell;
