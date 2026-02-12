/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputTelephoneComponent } from './input-telephone.component';

describe('InputTelephoneComponent', () => {
	let component: InputTelephoneComponent;
	let fixture: ComponentFixture<InputTelephoneComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InputTelephoneComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputTelephoneComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
