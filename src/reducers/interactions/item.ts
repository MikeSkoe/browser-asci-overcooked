import { State, Item, Composable, Thing } from '../../state.js';
import { makeId, pipe } from '../../help/utils.js';
import { OneToFive } from '../../state.js';
import { minMax } from '../../help/utils.js';
import { isIntersacting } from '../check.js';
import { onNothing } from './index.js';
import { compToStr } from '../../help/utils.js';

export const create = (entity: Item) => (state: State) => {
   const item: Composable = { entity, cutted: 1, baked: 1};
   const newItem: Thing = {
      x: -1,
      y: -1,
      id: makeId(),
      is: [item],
   }
   return {
      ...state,
      items: state.items.concat(newItem),
      guy: {
         ...state.guy,
         inHand: [newItem.id],
      }
   };
};

export const remove = (idToRemove: string) => (state: State) => ({
   ...state,
   items: state.items.filter(i => i.id !== idToRemove),
   guy: {
      ...state.guy,
      inHand: [],
   }
});

export const moveToReady = (idToMove: string) => (state: State) => {
   const itemToMove = state.items.find(i => i.id === idToMove);
   const itemToMoveStr = itemToMove.is.map(compToStr(true)).join(' + ');
   console.log('itemToMoveStr', itemToMoveStr);
   return {
      ...state,
      items: state.items.filter(i => i.id !== idToMove),
      ready: state.ready.concat(itemToMove),
      need: state.need.filter(i => i.is.map(compToStr(true)).join(' + ') !== itemToMoveStr),
      guy: {
         ...state.guy,
         inHand: [],
      }
   }
};

export const updateProp = (prop: string, itemId: string) => (state: State): State => {
   return {
      ...state, 
      items: state.items.map(
         i => i.id === itemId
            ? { ...i, 
               is: i.is.map(
                     comp => ({...comp, [prop]: Math.min(5, comp[prop] + 1) as OneToFive})
               )} 
            : i
      )
   }
};

const placeItem = 
   (newPos: [number, number], concatWith ?: Thing) => 
   (state: State) => 
{
   const cropH = minMax(0, state.grid[0].length - 1);
   const cropV = minMax(0, state.grid.length - 1);
   const [inHand] = state.guy.inHand;
   return {
      ...state,
      guy: {
         ...state.guy,
         inHand: [],
      },
      items: state.items.map(item => 
         item.id === inHand
            ? {
               ...item, 
               x: cropH(newPos[0]), 
               y: cropV(newPos[1]), 
               is: concatWith 
                  ? item.is.concat(concatWith.is)
                     .sort((a, b) => 
                        a.entity > b.entity
                           ? 1
                           : a.entity < b.entity
                              ? -1
                              : 0
                     )
                  : item.is
            }
            : item
      ).filter(i => i.id !== (concatWith  ? concatWith.id : undefined)),
   }
}

export const pull = 
   (itemId: string | undefined) => 
   (state: State) => 
{
   return {
      ...state,
      items: state.items.map(
         i => i.id === itemId
            ? {...i, x: -1, y: -1}
            : i
      ),
      guy: {
         ...state.guy,
         inHand: itemId ? [itemId] : state.guy.inHand
      },
   }
};

export const drop = 
   (newPos: [number, number], itemId: string | undefined) => 
   (state: State) => 
{
   const [inHand] = state.guy.inHand;
   const targetItem = state.items.find(i => i.id === itemId);
   const itemInHand = state.items.find(i => i.id === inHand);
   return pipe(
      !targetItem
         ? placeItem(newPos)
         : !isIntersacting(targetItem.is, itemInHand.is)
            ? placeItem(newPos, targetItem)
            : onNothing
   )(state);
}
