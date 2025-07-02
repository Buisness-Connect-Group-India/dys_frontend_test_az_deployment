import { TestBed } from '@angular/core/testing';

import { BranchGroupService } from './branch-group.service';

describe('BranchGroupService', () => {
  let service: BranchGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
