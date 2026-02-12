/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VersionsService } from './versions.service';

describe('Service: Versions', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [VersionsService],
		});
	});

	it('should ...', inject([VersionsService], (service: VersionsService) => {
		expect(service).toBeTruthy();
	}));
});
