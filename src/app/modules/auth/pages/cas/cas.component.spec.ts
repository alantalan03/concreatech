/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CasComponent } from './cas.component';

describe('CasComponent', () => {
  let component: CasComponent;
  let fixture: ComponentFixture<CasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
