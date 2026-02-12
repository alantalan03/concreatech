import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSmComponent } from './alert-sm.component';

describe('AlertSmComponent', () => {
	let component: AlertSmComponent;
	let fixture: ComponentFixture<AlertSmComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AlertSmComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AlertSmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
