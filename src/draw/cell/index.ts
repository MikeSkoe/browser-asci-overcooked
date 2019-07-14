import { Entity, Grid, Guy, Thing, Surface } from '../../state.js';
import { h, ElFn } from '../../help/lib.js';
import { pipe } from '../../help/utils.js';
import withGuy from './withGuy.js';
import withItems from './withItems.js';

const drawGrid = (el: ElFn) => 
   el((grid: Grid, guy: Guy, items: Thing[]) => {
      const allIn = pipe(
         withItems(items), 
         withGuy(guy)
      );

      return h('div', {}, 
         ...allIn(grid).map(
            entities => h('div', {},
               ...entities.map(([surface, entity]) => {
                  const item = items.find(i => i.id === entity);
                  return h('span', 
                     {
                        className: surface,
                        style: {
                           textDecoration: item && item.is.some(comp => comp.cutted === 5) 
                              ? 'line-through' 
                              : ''
                        },
                     },
                     item ? item.is[0].entity : entity
                  );
               })
            ))
      )
   })

export default drawGrid;
