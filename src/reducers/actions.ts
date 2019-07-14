import { Surface, Interaction, State, Guy, Grid } from "../state.js";
import { isWalkable } from './check.js';
import { 
   onGarbage, onTake, onCut, onStove, onBuns, onMeats, onReady, uninteraction 
} from './interactions/index.js';
import { minMax } from '../help/utils.js';

export const getSurface = (
	grid: Grid,
	[x, y]: [number, number]
): Surface => {
   const [surface] = grid[y][x];
   return surface;
}

const newGuyPos = (guy: Guy, [x, y]: [number, number], h, v): [number, number] => 
	[h(guy.x + x), v(guy.y + y)];
export const setInteraction = (interaction: Interaction, state: State) => {
	state.guy.interaction = interaction
	return state;
}

export const walkTo = (state: State, offset: [number, number]) => {
   let h = minMax(0, state.grid[0].length - 1);
   let v = minMax(0, state.grid.length - 1);
	const newPos = newGuyPos(state.guy, offset, h, v);
	const surface = getSurface(state.grid, newPos);
	if (isWalkable(surface)) {
		state.guy.x = newPos[0];
		state.guy.y = newPos[1];
	}
	return state;
}

export const actTo = (state: State, offset: [number, number]) => {
   let h = minMax(0, state.grid[0].length - 1);
   let v = minMax(0, state.grid.length - 1);
   const newPos = newGuyPos(state.guy, offset, h, v);
	const surface = getSurface(state.grid, newPos);
   switch (state.guy.interaction) {
      case Interaction.Take: return onTake(state, newPos);
      case Interaction.Action: return surface === Surface.Cutting
         ? onCut(state, newPos)
         : surface === Surface.Stove
            ? onStove(state, newPos)
            : surface === Surface.Buns
               ? onBuns(state)
               : surface === Surface.Meats
                  ? onMeats(state)
                  : surface === Surface.Garbage
                     ? onGarbage(state)
                     : surface === Surface.Ready
                        ? onReady(state)
                        : uninteraction(state);
   }
}

