import { pipe } from "../help/utils.js";
import withGuy from "../components/withGuy.js";
import { Entities, Guy, Cell } from "../state.js";

const convertToChars = (n: number) => {
    switch (n) {
        case Entities.Wall: return '#';
        case Entities.Guy: return '@';
        default: return '.';
    }
}

const draw = h => (
	cell: Cell, 
	guy: Guy,
) => {
    const modify = pipe<Cell>(withGuy(guy))

	return h('div', {},
		...modify(cell).map(nums => h('div', {},
			h('span', {}, nums.map(convertToChars).join('')))
		)
	)
}

export default draw;