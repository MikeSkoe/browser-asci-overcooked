import { Entity } from '../state.js';
export const pipe = (...fns) => (arg) => fns.reduce((acc, curr) => curr(acc), arg);
export const addFn = (fn, fn2) => (arg) => fn2(fn(arg));
export const d2 = (arr, size) => arr.reduce((acc, curr, index) => {
    const targetIndex = Math.floor(index / size);
    acc[targetIndex] = acc[targetIndex] || [];
    acc[targetIndex].push(curr);
    return acc;
}, []);
export const concat = (above) => (under) => under.map((item, index) => above.flat()[index] || item);
export const makeId = () => Math.random().toString(36).substr(2, 9);
export const minMax = (min, max) => (n) => Math.max(min, Math.min(max, n));
export const entityToStr = (e) => {
    switch (e) {
        case Entity.Meet: return 'meet';
    }
};
//# sourceMappingURL=utils.js.map