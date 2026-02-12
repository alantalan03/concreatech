/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputChipsComponent } from './input-chips.component';

describe('InputChipsComponent', () => {
  let component: InputChipsComponent;
  let fixture: ComponentFixture<InputChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
