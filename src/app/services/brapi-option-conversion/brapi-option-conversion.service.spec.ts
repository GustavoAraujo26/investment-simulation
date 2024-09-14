/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrapiOptionConversionService } from './brapi-option-conversion.service';

describe('Service: BrapiOptionConversion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrapiOptionConversionService]
    });
  });

  it('should ...', inject([BrapiOptionConversionService], (service: BrapiOptionConversionService) => {
    expect(service).toBeTruthy();
  }));
});
