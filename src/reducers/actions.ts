import { Interaction, State, Entity, Guy, Thing, Cell, Msg } from "../state.js";
import { isWalkable } from './check.js';
import { onTake, onCut } from './interactions.js';

export const getEntity = (
	items: Thing[], 
	cell: Cell, 
	[x, y]: [number, number]
): [Entity, string | undefined] => {
	let item: Thing | undefined = 
		items.find(item => item.x === x && item.y === y);
	let entity: Entity; 

	try {
		entity = cell[y][x];
	} catch {
		entity = Entity.Table;
	}
	return [entity, item ? item.id : undefined];
}
const newGuyPos = (guy: Guy, [x, y]: [number, number]): [number, number] => 
	[guy.x + x, guy.y + y];
export const setInteraction = (interaction: Interaction, state: State) => {
	state.guy.interaction = interaction
	return state;
}

export const walkTo = (state: State, offset: [number, number]) => {
	const newPos = newGuyPos(state.guy, offset);
	const [entityWithColor] = getEntity(state.items, state.cell, newPos);
	const [entity] = entityWithColor;
	if (isWalkable(entity as Entity)) {
		state.guy.x = newPos[0];
		state.guy.y = newPos[1];
	}
	return state;
}
export const actTo = (state: State, offset: [number, number]) => {
	const newPos = newGuyPos(state.guy, offset);
	switch (state.guy.interaction) {
		case Interaction.Take: return onTake(state, newPos);
      case Interaction.Cut: return onCut(state, newPos);
	}
}

