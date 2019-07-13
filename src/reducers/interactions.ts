import { minMax, entityToStr } from '../help/utils.js';
import { Thing, Interaction, State, Entity, Msg, Color, OneToFive } from "../state.js";
import { getEntity } from './actions.js';
import mkMsg from './mkMsg.js';

const pull = (state: State, newPos: [number, number]) => {
   const item = state.items.find(i => i.x === newPos[0] && i.y === newPos[1]);
   state.items = state.items.map(
      i => i.x === newPos[0] && i.y === newPos[1]
         ? {...i, x: -1, y: -1}
         : i
   );
   if (item) {
      state.guy.inHand = [item.id];
   }
   state.guy.interaction = Interaction.None;
   return state;
};

const testInteraction = (aIs, bIs) => aIs.some(a => bIs.some(b => a.entity === b.entity));

const placeItem = (state: State, inHand: string, newPos: [number, number], replaceWith?: Thing) => {
   const cropH = minMax(0, state.grid[0].length - 1);
   const cropV = minMax(0, state.grid.length - 1);
   state.items = state.items.map(item => 
      item.id === inHand
         ? {
            ...item, 
            x: cropH(newPos[0]), 
            y: cropV(newPos[1]), 
            is: replaceWith ? item.is.concat(replaceWith.is) : item.is
         }
         : item
   ).filter(i => i.id !== (replaceWith ? replaceWith.id : undefined));
   state.guy.inHand = [];
   return state;
}

const drop = (state: State, newPos: [number, number]) => {
   const target = state.items.find(i => i.x === newPos[0] && i.y === newPos[1]);
   const [inHand] = state.guy.inHand;
   const dropped = state.items.find(i => i.id === inHand);
   if (!target) {
      state = placeItem(state, inHand, newPos);
      //if (dropped.x === state.guy.x && dropped.y === state.guy.y) {
         //const dropped = state.items.find(i => i.x === state.guy.x && i.y === state.guy.y).is;
         //state.msgs.push(mkMsg(Msg.FoodOnFloor, entityToStr(dropped)));
      //}
   } else {
      if (!testInteraction(dropped.is, target.is)) {
         state = placeItem(state, inHand, newPos, target);
      }
   }
   return state;
}

export const onTake = (state: State, newPos: [number, number]) => {
	state.guy.interaction = Interaction.None;
	if (state.guy.inHand.length > 0) {
      state = drop(state, newPos);
   } else {
      state = pull(state, newPos);
   }
   return state;
}

export const onCut = (state: State, newPos: [number, number]) => {
   state.guy.interaction = Interaction.None;
   const item = state.items.find(i => i.x === newPos[0] && i.y === newPos[1]);
   const [color, entity] = getEntity(state.items, state.grid, newPos);
   if (item && color === Color.Gray) {
      state.items = state.items.map(
         i => {
            if (i.id === item.id) {
               //state.msgs.push(
                  //mkMsg(Msg.CuttedWith, entityToStr(i.is), `${(i.cutted + 1) * 20}`)
               //);
               return {...i, is: i.is.map(
                  comp => ({...comp, cutted: Math.min(5, comp.cutted + 1) as OneToFive})
               )} 
            } else {
               return i
            }
         }
      );
   }
   state.guy.interaction = Interaction.None;
   return state;
}
