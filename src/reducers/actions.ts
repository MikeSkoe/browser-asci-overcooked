import { Color, Interaction, State, Entity, Guy, Thing, Cell, Msg } from "../state.js";
import { isWalkable } from './check.js';
import { onTake, onCut } from './interactions.js';
import { minMax } from '../help/utils.js';

export const getEntity = (
	items: Thing[], 
	cell: Cell, 
	[x, y]: [number, number]
): [Color, string] => {
   const [color, entity] = cell[y][x];
   let item;
   try {
      item = items.find(i => i.x === x && i.y === y).is;
   } catch {
      item = entity;
   }
   return [color, item];
}

const newGuyPos = (guy: Guy, [x, y]: [number, number], h, v): [number, number] => 
	[h(guy.x + x), v(guy.y + y)];
export const setInteraction = (interaction: Interaction, state: State) => {
	state.guy.interaction = interaction
	return state;
}

export const walkTo = (state: State, offset: [number, number]) => {
   let h = minMax(0, state.cell[0].length - 1);
   let v = minMax(0, state.cell.length - 1);
	const newPos = newGuyPos(state.guy, offset, h, v);
	const [color, entity] = getEntity(state.items, state.cell, newPos);
	if (isWalkable(color)) {
		state.guy.x = newPos[0];
		state.guy.y = newPos[1];
	}
	return state;
}
export const actTo = (state: State, offset: [number, number]) => {
   let h = minMax(0, state.cell[0].length - 1);
   let v = minMax(0, state.cell.length - 1);
	const newPos = newGuyPos(state.guy, offset, h, v);
	switch (state.guy.interaction) {
		case Interaction.Take: return onTake(state, newPos);
      case Interaction.Cut: return onCut(state, newPos);
	}
}

