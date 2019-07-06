import { minMax } from '../../help/utils.js';
import { Guy, Cell, Entity, Thing } from '../../state.js';

const withItems = (items: Thing[], guy: Guy) => (cell: Cell) => {
	items.forEach(item => {
		const [inHand] = guy.inHand;
		if (inHand !== item.id) {
			const [,color] = cell[item.y][item.x];
			console.log('color', color);
			cell[item.y][item.x] = `${item.is}${color}` as Entity;
		}
	})
    return cell;
};

export default withItems;
