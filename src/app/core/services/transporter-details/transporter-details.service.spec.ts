/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransporterDetailsService } from './transporter-details.service';

describe('Service: TransporterDetails', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TransporterDetailsService],
		});
	});

	it('should ...', inject(
		[TransporterDetailsService],
		(service: TransporterDetailsService) => {
			expect(service).toBeTruthy();
		}
	));
});
