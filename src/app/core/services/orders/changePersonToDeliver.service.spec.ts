/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChangePersonToDeliverService } from './changePersonToDeliver.service';

describe('Service: ChangePersonToDeliver', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ChangePersonToDeliverService],
		});
	});

	it('should ...', inject(
		[ChangePersonToDeliverService],
		(service: ChangePersonToDeliverService) => {
			expect(service).toBeTruthy();
		}
	));
});
