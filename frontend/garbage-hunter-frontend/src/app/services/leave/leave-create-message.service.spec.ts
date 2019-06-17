import { TestBed } from '@angular/core/testing';

import { LeaveCreateMessageService } from './leave-create-message.service';

describe('LeaveCreateMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveCreateMessageService = TestBed.get(LeaveCreateMessageService);
    expect(service).toBeTruthy();
  });
});
