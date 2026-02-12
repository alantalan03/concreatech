/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ItemNotificationComponent } from './item-notification.component';

describe('ItemNotificationComponent', () => {
	let component: ItemNotificationComponent;
	let fixture: ComponentFixture<ItemNotificationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ItemNotificationComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemNotificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
