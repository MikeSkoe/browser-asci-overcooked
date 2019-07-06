import { Cell, Guy, Thing } from '../../state.js';
import { h, ElFn } from '../../help/lib.js';
import { pipe } from '../../help/utils.js';
import withGuy from './withGuy.js';
import withItems from './withItems.js';

const drawCell = (el: ElFn) => 
	el((cell: Cell, guy: Guy, items: Thing[]) => {
		const allIn = pipe(withItems(items, guy), withGuy(guy));

		return h('div', {}, 
			...allIn(cell)
				.map(entities => h('div', {},
					...entities.map(entity => {
						const [e, className] = entity;
						return h('span', {className}, e);
					})
				))
			)
	})

export default drawCell;
