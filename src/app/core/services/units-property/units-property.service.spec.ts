/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnitsPropertyService } from './units-property.service';

describe('Service: UnitsProperty', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitsPropertyService]
    });
  });

  it('should ...', inject([UnitsPropertyService], (service: UnitsPropertyService) => {
    expect(service).toBeTruthy();
  }));
});
