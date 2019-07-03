import init, { mount } from './help/lib.js';
import initialState from './state.js';
import draw from './draw/cell.js';
import handleInput from './reducers/moveGuy.js';
const { h, el, pub, sub } = init(initialState);
const drawCell = draw(h);
handleInput(pub);
const app = h('div', {}, h('h1', {}, 'test'), el(drawCell));
mount(app, '#app');
//# sourceMappingURL=index.js.map