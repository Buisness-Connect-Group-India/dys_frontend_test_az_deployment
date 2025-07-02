import { TestBed } from '@angular/core/testing';

import { CustomerConsentService } from './customer-consent.service';

describe('CustomerConsentService', () => {
  let service: CustomerConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerConsentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
