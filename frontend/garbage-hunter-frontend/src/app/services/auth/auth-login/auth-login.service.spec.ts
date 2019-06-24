import { TestBed } from '@angular/core/testing';

import { AuthLoginService } from './auth-login.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('AuthLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterModule.forRoot([])],
    providers: [],
  }));

  it('should be created', () => {
    const service: AuthLoginService = TestBed.get(AuthLoginService);
    expect(service).toBeTruthy();
  });
});
