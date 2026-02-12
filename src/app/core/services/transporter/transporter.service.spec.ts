/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransporterService } from './transporter.service';

describe('Service: Transporter', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TransporterService],
		});
	});

	it('should ...', inject(
		[TransporterService],
		(service: TransporterService) => {
			expect(service).toBeTruthy();
		}
	));
});
