import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleInformationComponent } from './circle-information.component';

describe('CircleInformationComponent', () => {
	let component: CircleInformationComponent;
	let fixture: ComponentFixture<CircleInformationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CircleInformationComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CircleInformationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
