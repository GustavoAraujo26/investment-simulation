/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrapiTextConversorService } from './brapi-text-conversor.service';

describe('Service: BrapiTextConversor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrapiTextConversorService]
    });
  });

  it('should ...', inject([BrapiTextConversorService], (service: BrapiTextConversorService) => {
    expect(service).toBeTruthy();
  }));
});
