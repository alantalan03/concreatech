/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DateTableWithActionComponent } from './date-table-with-action.component';

describe('DateTableWithActionComponent', () => {
  let component: DateTableWithActionComponent;
  let fixture: ComponentFixture<DateTableWithActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTableWithActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTableWithActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
