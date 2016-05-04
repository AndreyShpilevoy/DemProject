import * as $ from 'jquery';

export default class List<T> {
	private items: Array<T>;

	constructor() {
		this.items = [];
	}

	size(): number {
		return this.items.length;
	}

	add(value: T): void {
		this.items.push(value);
	}

	getByIndex(index: number): T {
		return this.items[index];
	}
}