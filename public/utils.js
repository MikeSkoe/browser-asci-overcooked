export const pipe = (...fns) => (arg) => fns.reduce((acc, curr) => curr(acc), arg);
export const addFn = (fn, fn2) => (arg) => fn2(fn(arg));
export const d2 = (arr) => arr.reduce((acc, curr, index) => {
    const targetIndex = Math.floor(index / 5);
    acc[targetIndex] = acc[targetIndex] || [];
    acc[targetIndex].push(curr);
    return acc;
}, []);
export const concat = (above) => (under) => under.map((item, index) => above.flat()[index] || item);
//# sourceMappingURL=utils.js.map