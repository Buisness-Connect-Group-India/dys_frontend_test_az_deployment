import { TestBed } from '@angular/core/testing';

import { ConfirmationModalService } from './confirmation-modal.service';

describe('DeleteConfirmationModalService', () => {
  let service: ConfirmationModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
