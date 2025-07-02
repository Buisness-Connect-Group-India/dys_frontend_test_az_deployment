import { TestBed } from '@angular/core/testing';

import { ComplaintOverviewService } from './complaint-overview.service';

describe('ComplaintOverviewService', () => {
  let service: ComplaintOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
