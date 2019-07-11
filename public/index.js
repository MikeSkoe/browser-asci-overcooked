import init, { mount } from './help/lib.js';
import initialState from './state.js';
import draw from './draw/index.js';
import handleInput from './reducers/index.js';
const { h, el, pub, sub } = init(initialState);
handleInput(pub);
const game = draw(el);
const app = h('div', {}, h('h1', {}, 'test'), game);
mount(app, '#app');
//# sourceMappingURL=index.js.map