import { minMax } from '../help/utils.js';
import { Interaction, State, Entity, Msg, Color, OneToFive } from "../state.js";
import { getEntity } from './actions.js';
import mkMsg from './mkMsg.js';

export const onTake = (state: State, newPos: [number, number]) => {
	state.guy.interaction = Interaction.None;
	if (state.guy.inHand.length > 0) {
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
         console.log('msgs', state.msgs);
         state.msgs = [mkMsg(Msg.FoodOnFloor, 'foooddd')];
         console.log('msgs', state.msgs);
      }
   } else {
      const [entity, itemId] = getEntity(state.items, state.cell, newPos);
      if (itemId) {
         state.guy.inHand = [itemId];
      }
      state.guy.interaction = Interaction.None;
   }
   return state;
}

export const onCut = (state: State, newPos: [number, number]) => {
   state.guy.interaction = Interaction.None;
   const [[entity, color], itemId] = getEntity(state.items, state.cell, newPos);
   if (itemId && color === Color.Gray) {
      state.items = state.items.map(
         item => {
            if (item.id === itemId) {
               //state.msgs.push(mkMsg(Msg.CuttedWith, item.is, item.cutted + 1));
               return {...item, cutted: Math.min(5, item.cutted + 1) as OneToFive} 
            } else {
               item
            }
         }
      );
   }
   state.guy.interaction = Interaction.None;
   return state;
}
