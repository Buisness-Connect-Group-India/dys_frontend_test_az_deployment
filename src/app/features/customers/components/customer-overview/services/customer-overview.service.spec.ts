import { TestBed } from '@angular/core/testing';

import { CustomerOverviewService } from './customer-overview.service';

describe('CustomerOverviewService', () => {
  let service: CustomerOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
