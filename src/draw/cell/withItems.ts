import { minMax } from '../../help/utils.js';
import { Guy, Cell, Entity, Thing } from '../../state.js';

const withItems = (items: Thing[], guy: Guy) => (cell: Cell) => {
	items.forEach(item => {
		const [inHand] = guy.inHand;
      console.log('item', item);
		if (inHand !== item.id) {
			const [,color] = cell[item.y][item.x];
         cell[item.y][item.x] = `${item.is}${color}${item.cutted === 5 ? 't' : 'f'}` as Entity;
		}
	})
    return cell;
};

export default withItems;
