import { minMax, entityToStr } from '../help/utils.js';
import { Interaction, State, Entity, Msg, Color, OneToFive } from "../state.js";
import { getEntity } from './actions.js';
import mkMsg from './mkMsg.js';

export const onTake = (state: State, newPos: [number, number]) => {
	state.guy.interaction = Interaction.None;
	if (state.guy.inHand.length > 0) {
      const item = state.items.find(i => i.x === newPos[0] && i.y === newPos[1]);
      if (!item) {
         const cropH = minMax(0, state.cell[0].length - 1);
         const cropV = minMax(0, state.cell.length - 1);
         const [inHand] = state.guy.inHand;
         state.items = state.items.map(item => 
            item.id === inHand
               ? {...item, x: cropH(newPos[0]), y: cropV(newPos[1])}
               : item
         );
         state.guy.inHand = [];
         const dropped = state.items.find(i => i.id === inHand);
         if (dropped.x === state.guy.x && dropped.y === state.guy.y) {
            const dropped = state.items.find(i => i.x === state.guy.x && i.y === state.guy.y).is;
            state.msgs.push(mkMsg(Msg.FoodOnFloor, entityToStr(dropped)));
         }
      }
   } else {
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
   }
   return state;
}

export const onCut = (state: State, newPos: [number, number]) => {
   state.guy.interaction = Interaction.None;
   const item = state.items.find(i => i.x === newPos[0] && i.y === newPos[1]);
   const [color, entity] = getEntity(state.items, state.cell, newPos);
   if (item && color === Color.Gray) {
      state.items = state.items.map(
         i => {
            if (i.id === item.id) {
               state.msgs.push(
                  mkMsg(Msg.CuttedWith, entityToStr(i.is), `${(i.cutted + 1) * 20}`)
               );
               return {...i, cutted: Math.min(5, i.cutted + 1) as OneToFive} 
            } else {
               return i
            }
         }
      );
   }
   state.guy.interaction = Interaction.None;
   return state;
}
