import { Item } from '../state.js';
import { h, ElFn } from '../help/lib.js';

const drawInventory = (
	el: ElFn
) => 
	el((guy_inHand: [Item] | []) => {
		const [item] = guy_inHand;
		return h('div', {},
			item
				? item
				: 'none'
		)
	}
	)
export default drawInventory;
