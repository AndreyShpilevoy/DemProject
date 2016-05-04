import * as $ from 'jquery';

export default class Dictionary<T, TT> {
	private keys: Array<T>;
	private values: Array<TT>;

	constructor() {
		this.keys = [];
		this.values = [];
	}

	size(): number {
		return this.keys.length;
	}

	add(key: T, value: TT): void {
		this.keys.push(key);
		this.values.push(value);
	}

	getByIndex(index: number): [T, TT] {
		return [this.keys[index], this.values[index]];
	}

	getValueByKey(key: T): TT {
		var position = this.keys.indexOf(key);
		if (position !== -1) {
			return this.values[position];
		} else {
			return undefined;
		}
	}

	setValueByKey(key: T, value: TT) {
		var position = this.keys.indexOf(key);
		if (position !== -1) {
			this.values[position] = value;
		}
	}
}