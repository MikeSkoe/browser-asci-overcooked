import init, { mount } from './help/lib.js';
import initialState from './state.js';
import draw from './draw/index.js';
import handleInput from './reducers/moveGuy.js';

const {h, el, pub, sub} = init(initialState);

handleInput(pub);

const app = h('div', {},
	h('h1', {}, 'test'),
	draw(el),
)

mount(app, '#app');
