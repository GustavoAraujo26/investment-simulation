/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WalletsService } from './wallets.service';

describe('Service: Wallets', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletsService]
    });
  });

  it('should ...', inject([WalletsService], (service: WalletsService) => {
    expect(service).toBeTruthy();
  }));
});
