import { TestBed } from '@angular/core/testing';

import { UserCategoryService } from './user-category.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserCategoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [],
    })
  );

  it('should be created', () => {
    const service: UserCategoryService = TestBed.get(UserCategoryService);
    expect(service).toBeTruthy();
  });
});
