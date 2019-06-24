import { TestBed } from '@angular/core/testing';

import { LeaveCreateMessageService } from './leave-create-message.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('LeaveCreateMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterModule.forRoot([])],
    providers: [],
  }));

  it('should be created', () => {
    const service: LeaveCreateMessageService = TestBed.get(LeaveCreateMessageService);
    expect(service).toBeTruthy();
  });
});
