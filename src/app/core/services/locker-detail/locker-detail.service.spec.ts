/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LockerDetailService } from './locker-detail.service';

describe('Service: LockerDetail', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LockerDetailService],
		});
	});

	it('should ...', inject(
		[LockerDetailService],
		(service: LockerDetailService) => {
			expect(service).toBeTruthy();
		}
	));
});
