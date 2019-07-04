import { Guy, Entities, State } from "../state.js";

const newGuyPos = (guy: Guy, [x, y]: [number, number]) => [guy.x + x, guy.y + y];
const isWalkable = (entity: Entities) => entity === Entities.Floor
const walkTo = (state: State, offset: [number, number]) => {
	const newPos = newGuyPos(state.guy, offset);
	let entity: Entities;
	try {
		entity = state.cell[newPos[1]][newPos[0]];
	} catch {
		entity = Entities.Wall;
	}
	console.log('entity', Entities[entity]);
	if (isWalkable(entity)) {
		return {
			...state,
			guy: {
				...state.guy,
				x: newPos[0],
				y: newPos[1],
			}
		};
	}
	return state;
}

const handleInput = (pub) => {
    const MOVE_RIGHT = pub(
        ['guy'], 
		(state: State) => 
			walkTo(state, [1, 0]), 
    );
    const MOVE_LEFT = pub(
        ['guy'], 
		(state: State) => 
			walkTo(state, [-1, 0]), 
    );
    const MOVE_DOWN = pub(
        ['guy'], 
		(state: State) => 
			walkTo(state, [0, 1]), 
    );
    const MOVE_UP = pub(
        ['guy'], 
		(state: State) => 
			walkTo(state, [0, -1]), 
    );

    const directions = {
        l: MOVE_RIGHT,
        h: MOVE_LEFT,
        j: MOVE_DOWN,
        k: MOVE_UP,
    }

    document.addEventListener('keydown', e => {
        if (directions[e.key]) {
            directions[e.key]()
        }
    })
}

export default handleInput;
