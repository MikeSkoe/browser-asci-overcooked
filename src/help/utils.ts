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
