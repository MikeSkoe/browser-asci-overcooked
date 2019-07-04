export const docFn = str => document[str].bind(document),
	q = docFn('querySelector'),
	c = docFn('createElement'),
	t = docFn('createTextNode');

export type WithKey = {key: string};
export type WithDel = {del?: () => void};
export type El = HTMLElement & WithKey & WithDel;
export type AnyFn = {(...args: any[]): any; args?: string[]};
export type Sub = (keys: string[], fn: AnyFn, unsub?: boolean) => (() => void | undefined);
export type Pub = (keys: string[], fn: AnyFn) => () => void;
export type FromGetState = (value?: any) => any | undefined;
export type GetState = (init?: {}) => (value?: any) => any | undefined;
export type MakePubSub = (callbacks: {}, state: GetState) => {sub: Sub, pub: Pub};
export type lifeCycle = {
	onCreate?: (...args: any[]) => void, 
	onUpdate?: (...args: any[]) => void,
	onRemove?: (...args: any[]) => void,
	shouldUpdate?: (...args: any[]) => void,
}

const insertAfter = (
	oldEl: El, 
	newEl: El
) => oldEl.parentNode.insertBefore(newEl, oldEl.nextSibling);
const camelToDot = (str: string) => str.split('_');
const getArgs = (fn: AnyFn) => ('' + fn).match(/(\(|^)(?<a>.+?)[=\)]/).groups['a'].trim().split(', ');
const notIn = (arr: WithKey[]) => (item: WithKey) => !arr.some(i => i.key === item.key);
const getIn = (arr: WithKey[], key: string) => arr.find(i => i.key === key);
const options = {
	'object': (obj: El, el: El) => el.appendChild(obj),
	'string': (str: string, el: El) => options['object'](t(str), el),
};

export const mount = (el: El, selector: string) => q(selector).appendChild(el);

const h = (
	name: string, 
	attrs: {style?: {}} = {}, 
	...children: El[]
) => {
	const {style, ...restAttrs} = attrs;
	const el = Object.assign(
		c(name),
		restAttrs,
	);
	Object.assign(el.style, style);
	children.forEach(child => options[(typeof child)](child, el));
	return el;
};

const initPubSub = (callbacks: {}, state: GetState) => ({
	sub: (keys: string[], fn: AnyFn, unsub = false) => {
		fn.args = keys;
		const unsubscribe = () => keys.forEach(key => 
			callbacks[key] = callbacks[key].filter(f => f !== fn)
		);
		keys.forEach(key => {
			callbacks[key] = callbacks[key] || [];
			unsub 
				? unsubscribe()
				: callbacks[key].push(fn);
		});
		return unsubscribe;
	},

	pub: (keys: string[], fn: AnyFn) => () => {
		state(fn(state()));
		keys.forEach(key => {
			(callbacks[key] || []).forEach(fn => {
				fn(...(fn.args || []).map(arg => state(arg)))
			})
		});
	}
});

const text = (state: GetState, sub: Sub) => (fn: AnyFn) => {
	const fnArgs = getArgs(fn);
	const textNode = t(fn(...fnArgs.map(arg => state(arg))));
	sub(fnArgs, (...stVals) => textNode.data = fn(...stVals));
	return textNode;
};

const el = (state: GetState, sub: Sub) => (
	fn: AnyFn, 
	lifeCycle: lifeCycle = {}
) => {
	const fnArgs = getArgs(fn);
	lifeCycle.onCreate && lifeCycle.onCreate(...getArgs(lifeCycle.onCreate).map(arg => state()[arg]));
	let currEl = fn(...fnArgs.map(arg => state()[arg]));
	let prevVals = fnArgs.map(arg => state()[arg]);
	const subscription = (...stVals) => {
		if ( !lifeCycle.shouldUpdate 
			|| lifeCycle.shouldUpdate && lifeCycle.shouldUpdate(stVals, prevVals)
		) {
			const newEl = fn(...stVals);
			currEl.replaceWith(newEl);
			currEl = newEl;
			lifeCycle.onUpdate && lifeCycle.onUpdate(...getArgs(lifeCycle.onUpdate).map(arg => state(arg)));
		}
		prevVals = stVals;
	};
	const unsub = sub(fnArgs, subscription);
	currEl.del = () => {
		lifeCycle.onRemove && lifeCycle.onRemove(...getArgs(lifeCycle.onRemove).map(arg => state(arg)));
		unsub();
		currEl.remove();
	};
	return currEl;
};

const getSetState: GetState = (initialState: {}) => (value?: string) => {
	return !value
		? initialState
		: typeof value === 'string'
			? camelToDot(value).reduce((acc, cur) => acc[cur], initialState)
			: initialState = value
}

const map = (state: GetState, sub: Sub) => 
	(fn, shouldUpdate = (pV, nV) => JSON.stringify(pV) !== JSON.stringify(nV)) => 
{
	const [fnArg] = getArgs(fn);
	let arr = state()[fnArg];
	const placeholder = c('div');
	let items = [placeholder].concat(...arr.map(fn));

	sub([fnArg], (...stVals) => {
		const newArr = state()[fnArg];
		const addedVals = newArr.filter(item => !!item && notIn(arr)(item));
		const removedVals = arr.filter( notIn(newArr));
		const oldWithoutRemoved = arr.filter( notIn(removedVals));
		const newWithoutAdded = newArr.filter( notIn(addedVals));
		const newItems = [];

		removedVals.forEach(
			val => {
				const deleted = getIn(items, val.key) as El;
				deleted.del ? deleted.del() : deleted.remove();
			}
		);
		newWithoutAdded.forEach(
			(newVal, index) => {
				if (
					newVal.key === oldWithoutRemoved[index].key
					&& !shouldUpdate(oldWithoutRemoved[index], newVal)
				) {
					newItems.push(getIn(items, newVal.key));
				} else {
					const newItem = fn(newVal);
					const oldItem = getIn(items, oldWithoutRemoved[index].key) as El; 
					insertAfter(oldItem, newItem);
					newItems.push(newItem);
					oldItem.del ? oldItem.del() : oldItem.remove();
				}
			}
		);
		addedVals.forEach(
			newVal => {
				const newItem = fn(newVal);
				const indexOfAfter = newArr.findIndex(item => item.key === newVal.key) - 1;
				const prevVal = newArr[indexOfAfter];
				insertAfter( prevVal ? getIn(newItems, prevVal.key) : placeholder, newItem)
				newItems.push(newItem);
			}
		)
		items = newItems;
		arr = newArr;
	});
	return items;
};

const init = <T>(initialState: T) => {
	const state = getSetState(initialState);
	const callbacks = {};
	const {pub, sub} = initPubSub(callbacks, state);
	return {
		sub,
		pub,
		text: text(state, sub),
		el: el(state, sub),
		map: map(state, sub),
		h,
	}
}

export default init;
