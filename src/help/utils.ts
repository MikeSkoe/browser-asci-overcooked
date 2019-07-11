import { Entity } from '../state.js';

export const pipe = 
	<A>(...fns: ((a: A) => A)[]) => 
		(arg: A): A => 
			fns.reduce((acc, curr) => curr(acc), arg);
export const addFn = <A>(fn: (a: A) => A, fn2: (a: A) => A) => (arg: A) => fn2(fn(arg));

export const d2 = <T>(arr: T[], size: number) => arr.reduce((acc, curr, index) => {
	const targetIndex = Math.floor(index / size);
	acc[targetIndex] = acc[targetIndex] || [];
	acc[targetIndex].push(curr);
	return acc;
},[]);

export const concat = <A>(above: A[]) => (under: A[]) => under.map((item, index) => above.flat()[index] || item);

export const makeId = () => Math.random().toString(36).substr(2, 9);
export const minMax = (min: number, max: number) => (n: number) => Math.max(min, Math.min(max, n))
export const entityToStr = (e: Entity): string => {
   switch (e) {
      case Entity.Meet: return 'meet';
   }
}
