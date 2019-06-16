import { TestBed } from '@angular/core/testing';

import { AuthAdminService } from './auth-admin.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('AuthAdminService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([])],
      providers: [],
    })
  );

  it('should be created', () => {
    const service: AuthAdminService = TestBed.get(AuthAdminService);
    expect(service).toBeTruthy();
  });
});
