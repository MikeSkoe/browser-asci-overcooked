export enum Entities {
    Floor,
    Wall,
    Guy = 7,
}

export type Cell = number[][];
export type Guy = {x: number, y: number};
export type Grid = {width: number, height: number};
export interface State {
	cell: Cell;
    guy: Guy;
    grid: Grid;
}

const initialState: State = {
    grid: {
        width: 5,
        height: 5,
    },
	cell: [
		[1,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,1,0],
		[0,0,0,0,1],
	],
	guy: {
		x: 2,
		y: 0,
	}
};

export default initialState;