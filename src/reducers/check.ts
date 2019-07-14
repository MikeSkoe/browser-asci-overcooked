import { Entity, Guy, Interaction, Surface } from '../state.js';

export const isWalkable = (surface: Surface) => 
   surface === Surface.Floor;
export const isActable = (entity: Entity) => entity === Entity.Meat;
export const isInteracting = (guy: Guy) => guy.interaction !== Interaction.None;
export const isIntersacting = (aIs, bIs) => aIs.some(a => bIs.some(b => a.entity === b.entity));

