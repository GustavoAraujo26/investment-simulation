/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StocksContainerService } from './stocks-container.service';

describe('Service: StocksContainer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocksContainerService]
    });
  });

  it('should ...', inject([StocksContainerService], (service: StocksContainerService) => {
    expect(service).toBeTruthy();
  }));
});
