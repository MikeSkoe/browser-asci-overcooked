import { 
   Interaction, State, Entity 
} from '../../state.js';
import * as items from './item.js';
import { pipe } from '../../help/utils.js';

export const uninteraction = (state: State) => {
   return {...state, guy: {...state.guy, interaction: Interaction.None}};
}

export const onTake = (state: State, newPos: [number, number]) => {
   const item = state.items.find(i => i.x === newPos[0] && i.y === newPos[1]);
   const itemId = item ? item.id : undefined;
   return pipe(
      uninteraction,
      state.guy.inHand.length > 0
         ? items.drop(newPos, itemId)
         : items.pull(itemId),

   )(state);
}

export const onStove = (state: State, newPos: [number, number]) => {
   const item = state.items.find(i => i.x === newPos[0] && i.y === newPos[1]);
   return pipe(
      uninteraction,
      item 
         ? items.updateProp('baked', item.id)
         : onNothing,
   )(state);
}

export const onCut = (state: State, newPos: [number, number]) => {
   const item = state.items.find(i => i.x === newPos[0] && i.y === newPos[1]);
   return pipe(
      uninteraction,
      item 
         ? items.updateProp('cutted', item.id)
         : onNothing
   )(state);
}

export const onBuns = (state: State) => {
   const [inHand] = state.guy.inHand;
   return pipe(
      uninteraction,
      inHand
         ? onNothing
         : items.create(Entity.Bun),
   )(state);
}

export const onMeats = (state: State) => {
   const [inHand] = state.guy.inHand;
   return pipe(
      uninteraction,
      inHand
         ? onNothing
         : items.create(Entity.Meat),
   )(state);
}

export const onGarbage = (state: State) => {
   const [inHand] = state.guy.inHand;
   return pipe(
      uninteraction,
      inHand
         ? items.remove(inHand)
         : onNothing,
   )(state);
}

export const onReady = (state: State) => {
   const [inHand] = state.guy.inHand;
   return pipe(
      uninteraction,
      inHand
         ? items.moveToReady(inHand)
         : onNothing,
   )(state);
}

export const onNothing = (state: State) => state;
