import { minMax } from '../help/utils.js';
import { Interaction, State, Entity, Guy, Thing, Cell } from "../state.js";

const isWalkable = (entity: Entity) => 
	entity === Entity.Floor
	|| entity === Entity.Meet
const isActable = (entity: Entity) => entity === Entity.Meet;
export const isInteracting = (guy: Guy) => guy.interaction !== Interaction.None;

const getEntity = (
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
		entity = Entity.Wall;
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
	console.log('state', state);
	switch (state.guy.interaction) {
		case Interaction.Take: {
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
					state.msgs.push('TXT');
				}
				return state;
			}
			const [entity, itemId] = getEntity(state.items, state.cell, newPos);
			if (itemId) {
				state.guy.inHand = [itemId];
			}
			state.guy.interaction = Interaction.None;
		}
	}
	return state;
}

