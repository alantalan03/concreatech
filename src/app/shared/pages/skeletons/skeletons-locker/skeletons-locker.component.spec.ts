/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SkeletonsLockerComponent } from './skeletons-locker.component';

describe('SkeletonsLockerComponent', () => {
	let component: SkeletonsLockerComponent;
	let fixture: ComponentFixture<SkeletonsLockerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SkeletonsLockerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonsLockerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
