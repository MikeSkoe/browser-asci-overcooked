import { makeId } from './help/utils.js';

export enum Entity {
   Floor = '.',
   Table = '#',
   Guy = '@',
   Meet = '0',
}
export type Item = Entity.Meet;
export type Decore = Entity.Floor | Entity.Table | Entity.Guy;
export enum Msg {
	FoodOnFloor,
   CuttedWith,
}

export interface State {
  cell: Cell;
  guy: Guy;
  items: Thing[];
  msgs: string[];
}
export type Cell = ([Color, Entity | string])[][];
export interface Guy {
  x: number, 
  y: number, 
  interaction: Interaction,
  inHand: [string] | [],
};
export type OneToFive = 1 | 2 | 3 | 4 | 5;
export interface Thing {
   x: number,
   y: number,
   is: Item,
   id: string,
   cutted: OneToFive,
}
export enum Color {
  Black = 'b',
  White = 'w',
  Gray = 'g',
}
export enum Interaction {
   None,
   Take,
   Cut,
}

const W: [Color, Entity] = [Color.White, Entity.Floor];
const G: [Color, Entity] = [Color.Gray, Entity.Table];
const B: [Color, Entity] = [Color.Black, Entity.Table];
const initialState: State = {
  cell: [ 
    [B,W,W,W,B],
    [W,G,W,W,W],
    [W,W,W,W,W],
    [W,W,W,G,W],
    [W,B,W,W,B],
  ],
  guy: {
    x: 2,
    y: 0,
    interaction: Interaction.None,
    inHand: [],
  },
  items: [
    {x: 2, y: 3, is: Entity.Meet, id: makeId(), cutted: 1},
    {x: 3, y: 3, is: Entity.Meet, id: makeId(), cutted: 1},
  ],
  msgs: [],
};

export default initialState;
