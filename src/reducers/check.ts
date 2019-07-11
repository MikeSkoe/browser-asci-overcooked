import { Entity, Guy, Interaction } from '../state.js';

export const isWalkable = (entity: Entity) => 
	entity === Entity.Floor
	|| entity === Entity.Meet
export const isActable = (entity: Entity) => entity === Entity.Meet;
export const isInteracting = (guy: Guy) => guy.interaction !== Interaction.None;

