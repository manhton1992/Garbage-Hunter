import { TestBed } from '@angular/core/testing';

import { MessageCategoryService } from './message-category.service';
import { HttpClientModule } from '@angular/common/http';

describe('MessageCategoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [],
    })
  );

  it('should be created', () => {
    const service: MessageCategoryService = TestBed.get(MessageCategoryService);
    expect(service).toBeTruthy();
  });
});
