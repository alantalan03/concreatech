/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CosComponent } from './cos.component';

describe('CosComponent', () => {
  let component: CosComponent;
  let fixture: ComponentFixture<CosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
