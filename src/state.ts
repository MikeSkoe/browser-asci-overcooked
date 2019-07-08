import { makeId } from './help/utils.js';

export enum Entity {
  Floor = '.',
  Wall = '#',
  Guy = '@',
  Meet = '0',
}

export enum Color {
  Black = 'b',
  White = 'w',
}

export type Item = Entity.Meet;
export type Decore = Entity.Floor | Entity.Wall | Entity.Guy;

export enum Interaction {
  None,
  Take,
}

export type Cell = Entity[][];
export interface Guy {
  x: number, 
  y: number, 
  interaction: Interaction,
  inHand: [string] | [],
};
export interface Thing {
  x: number,
  y: number,
  is: Item,
  id: string,
}
export interface State {
  cell: Cell;
  guy: Guy;
  items: Thing[];
  msgs: string[];
}

const F = `${Entity.Floor}${Color.White}` as Entity;
const W = `${Entity.Wall}${Color.Black}` as Entity;

const initialState: State = {
  cell: [ 
    [W,F,F,F,W],
    [F,W,F,F,F],
    [F,F,F,F,F],
    [F,F,F,W,F],
    [F,W,F,F,W],
  ],
  guy: {
    x: 2,
    y: 0,
    interaction: Interaction.None,
    inHand: [],
  },
  items: [
    {x: 2, y: 3, is: Entity.Meet, id: makeId()},
    {x: 3, y: 3, is: Entity.Meet, id: makeId()},
  ],
  msgs: ['TEST'],
};

export default initialState;
