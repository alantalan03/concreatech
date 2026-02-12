import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMdComponent } from './alert-md.component';

describe('AlertMdComponent', () => {
	let component: AlertMdComponent;
	let fixture: ComponentFixture<AlertMdComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AlertMdComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AlertMdComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
