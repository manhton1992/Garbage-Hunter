import { TestBed } from '@angular/core/testing';

import { MessageCategoryService } from './message-category.service';

describe('MessageCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageCategoryService = TestBed.get(MessageCategoryService);
    expect(service).toBeTruthy();
  });
});
