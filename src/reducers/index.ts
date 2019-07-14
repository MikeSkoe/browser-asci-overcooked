import { Interaction, State } from '../state.js';
import { setInteraction, walkTo, actTo, } from './actions.js';
import { isInteracting } from './check.js';

const handleInput = (pub) => {
   const MOVE_RIGHT = pub(
      ['guy', 'guy_inHand', 'msgs', 'ready', 'need'], 
      (state: State) => 
         isInteracting(state.guy)
            ? actTo(state, [1, 0]) 
            : walkTo(state, [1, 0]));

   const MOVE_LEFT = pub(
      ['guy', 'guy_inHand', 'msgs', 'ready', 'need'], 
      (state: State) => 
         isInteracting(state.guy)
            ? actTo(state, [-1, 0]) 
            : walkTo(state, [-1, 0]));

   const MOVE_DOWN = pub(
      ['guy', 'guy_inHand', 'msgs', 'ready', 'need'], 
      (state: State) => 
         isInteracting(state.guy)
            ? actTo(state, [0, 1]) 
            : walkTo(state, [0, 1]));

   const MOVE_UP = pub(
      ['guy', 'guy_inHand', 'msgs', 'ready', 'need'], 
      (state: State) => 
         isInteracting(state.guy)
            ? actTo(state, [0, -1]) 
            : walkTo(state, [0, -1]));

   const START_INTERACT = (inter: Interaction) => pub(
      ['guy_inHand'],
      (state: State) =>
         setInteraction(inter, state));

   const directions = {
      l: MOVE_RIGHT,
      h: MOVE_LEFT,
      j: MOVE_DOWN,
      k: MOVE_UP,
      d: START_INTERACT(Interaction.Take),
      f: START_INTERACT(Interaction.Action),
   }

   document.addEventListener('keydown', e => {
      if (directions[e.key]) {
         directions[e.key]()
      }
   })
}

export default handleInput;
