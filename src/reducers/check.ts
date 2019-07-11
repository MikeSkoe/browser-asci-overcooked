import { Entity, Guy, Interaction, Color } from '../state.js';

export const isWalkable = (color: Color) => 
   color === Color.White;
export const isActable = (entity: Entity) => entity === Entity.Meet;
export const isInteracting = (guy: Guy) => guy.interaction !== Interaction.None;

