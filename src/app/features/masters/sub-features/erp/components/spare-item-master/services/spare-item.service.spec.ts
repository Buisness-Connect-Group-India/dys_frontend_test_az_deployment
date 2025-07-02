import { TestBed } from '@angular/core/testing';

import { SpareItemService } from './spare-item.service';

describe('SpareItemService', () => {
  let service: SpareItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpareItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
