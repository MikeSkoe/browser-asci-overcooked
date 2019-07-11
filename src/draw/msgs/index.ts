import { h, ElFn } from '../../help/lib.js';
import { Msg } from '../../state.js';

const msgToString = (msg: Msg) => {
	switch (msg) {
		case Msg.FoodOnFloor:
			return 'You threw a food, it fell to the floor';
	}
}

const drawMsgs = (el: ElFn) => 
	el((msgs: Msg[]) => h('div', {className: 'msgs'}, 
		...msgs.map(msg => h('div', {}, msgToString(msg)))
	));

export default drawMsgs;
