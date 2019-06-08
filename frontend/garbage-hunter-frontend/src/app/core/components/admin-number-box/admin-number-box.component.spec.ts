import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNumberBoxComponent } from './admin-number-box.component';

describe('AdminNumberBoxComponent', () => {
  let component: AdminNumberBoxComponent;
  let fixture: ComponentFixture<AdminNumberBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNumberBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNumberBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
