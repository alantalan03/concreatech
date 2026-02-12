import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class IntervalService {
	private intervals: number[] = [];

	constructor() {}

	setInterval(callback: Function, delay: number): number {
		const intervalId = window.setInterval(callback, delay);
		this.intervals.push(intervalId);
		return intervalId;
	}

	clearInterval(intervalId: number): void {
		window.clearInterval(intervalId);
		this.intervals = this.intervals.filter((id) => id !== intervalId);
	}

	clearAllIntervals(): void {
		this.intervals.forEach((intervalId) => window.clearInterval(intervalId));
		this.intervals = [];
	}
}
