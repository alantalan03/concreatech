/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminClientService } from './admin-client.service';

describe('Service: AdminClient', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AdminClientService],
		});
	});

	it('should ...', inject(
		[AdminClientService],
		(service: AdminClientService) => {
			expect(service).toBeTruthy();
		}
	));
});
