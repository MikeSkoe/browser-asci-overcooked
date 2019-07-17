import { makeId } from './help/utils.js';

export enum Entity {
   Plate,
   Floor,
   Table,
   Guy,
   Green,
   Meat,
   Bun,
}
export type Item = Entity.Meat | Entity.Bun | Entity.Green | Entity.Plate;
export enum Msg {
	FoodOnFloor,
   CuttedWith,
}

export interface State {
   grid: Grid;
   guy: Guy;
   items: Thing[];
   msgs: string[];
   ready: Thing[];
   need: Thing[];
}
export type Grid = [Surface, Entity][][];
export interface Guy {
   x: number, 
   y: number, 
   interaction: Interaction,
   inHand: [string] | [],
};
export type OneToFive = 1 | 2 | 3 | 4 | 5;
export interface Composable {
   entity: Item,
   cutted: OneToFive,
   baked: OneToFive,
}
export interface Thing {
   x: number,
   y: number,
   id: string,
   is: Composable[],
}
export enum Surface {
   Table,
   Floor,
   Cutting,
   Stove,
   Meats,
   Buns,
   Garbage,
   Ready,
   Greens,
   Plates,
}
export enum Interaction {
   None,
   Take,
   Action,
}

const F: [Surface, Entity] = [Surface.Floor, Entity.Floor];
const C: [Surface, Entity] = [Surface.Cutting, Entity.Table];
const T: [Surface, Entity] = [Surface.Table, Entity.Table];
const S: [Surface, Entity] = [Surface.Stove, Entity.Table];
const M: [Surface, Entity] = [Surface.Meats, Entity.Table];
const B: [Surface, Entity] = [Surface.Buns, Entity.Table];
const G: [Surface, Entity] = [Surface.Garbage, Entity.Table];
const D: [Surface, Entity] = [Surface.Ready, Entity.Table];
const g: [Surface, Entity] = [Surface.Greens, Entity.Table];
const P: [Surface, Entity] = [Surface.Plates, Entity.Table];

const initialState: State = {
   grid: [ 
      [T,F,F,F,D],
      [C,F,F,F,F],
      [S,F,F,F,F],
      [M,F,F,F,F],
      [B,F,F,F,P],
      [G,F,F,F,g],
   ],
   guy: {
      x: 2,
      y: 0,
      interaction: Interaction.None,
      inHand: [],
   },
   items: [],
   msgs: [],
   ready: [],
   need: [
      {
         x: -1,
         y: -1,
         id: 'asdf',
         is: [
            {
               entity: Entity.Meat,
               cutted: 1,
               baked: 1,
            },
            {
               entity: Entity.Bun,
               cutted: 1,
               baked: 1,
            },
         ]
      }
   ],
};

export default initialState;
