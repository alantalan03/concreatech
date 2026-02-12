/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdersDetailService } from './orders-detail.service';

describe('Service: OrdersDetail', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [OrdersDetailService],
		});
	});

	it('should ...', inject(
		[OrdersDetailService],
		(service: OrdersDetailService) => {
			expect(service).toBeTruthy();
		}
	));
});
