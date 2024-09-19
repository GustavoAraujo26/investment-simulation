/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrapiStockLoadingService } from './brapi-stock-loading.service';

describe('Service: BrapiStockLoading', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrapiStockLoadingService]
    });
  });

  it('should ...', inject([BrapiStockLoadingService], (service: BrapiStockLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
