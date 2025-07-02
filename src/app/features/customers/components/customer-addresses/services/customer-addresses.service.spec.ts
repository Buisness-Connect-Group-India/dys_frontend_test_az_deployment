import { TestBed } from '@angular/core/testing';

import { CustomerAddressesService } from './customer-addresses.service';

describe('CustomerAddressesService', () => {
  let service: CustomerAddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
