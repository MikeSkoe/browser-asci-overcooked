import { h, ElFn } from '../../help/lib.js';
import { Msg } from '../../state.js';

const drawMsgs = (el: ElFn) => 
	el((msgs: string[]) => h('div', {className: 'msgs'}, 
		...msgs.map(msg => h('div', {}, msg))
	));

export default drawMsgs;
