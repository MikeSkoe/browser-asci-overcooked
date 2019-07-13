import { makeId } from './help/utils.js';

export enum Entity {
   Floor = '.',
   Table = '#',
   Guy = '@',
   Meet = '0',
   Bun = 'B',
}
export type Item = Entity.Meet | Entity.Bun;
export type Decore = Entity.Floor | Entity.Table | Entity.Guy;
export enum Msg {
	FoodOnFloor,
   CuttedWith,
}

export interface State {
  grid: Grid;
  guy: Guy;
  items: Thing[];
  msgs: string[];
}
export type Grid = Color[][];
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
}
export interface Thing {
   x: number,
   y: number,
   id: string,
   is: Composable[],
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

const W: Color = Color.White;
const G: Color = Color.Gray;
const B: Color = Color.Black;
const initialState: State = {
  grid: [ 
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
     {id: makeId(), x: 2, y: 3, is: [
        { entity: Entity.Meet, cutted: 1 },
     ]},
     {id: makeId(), x: 3, y: 3, is: [
        { entity: Entity.Bun, cutted: 1 },
     ]},
     {id: makeId(), x: 4, y: 4, is: [
        { entity: Entity.Bun, cutted: 1 },
     ]},
  ],
  msgs: [],
};

export default initialState;
