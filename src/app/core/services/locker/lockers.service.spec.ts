/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LockersService } from './lockers.service';

describe('Service: Lockers', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LockersService],
		});
	});

	it('should ...', inject([LockersService], (service: LockersService) => {
		expect(service).toBeTruthy();
	}));
});
