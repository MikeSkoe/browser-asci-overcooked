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
export type Cell = Entity[][];
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

const F = `${Entity.Floor}${Color.White}` as Entity;
const W = `${Entity.Table}${Color.Black}` as Entity;
const G = `${Entity.Table}${Color.Gray}` as Entity;
const initialState: State = {
  cell: [ 
    [W,F,F,F,W],
    [F,G,F,F,F],
    [F,F,F,F,F],
    [F,F,F,G,F],
    [F,W,F,F,W],
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
