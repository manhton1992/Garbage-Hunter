import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMessageComponent } from './create-message.component';
import { MapComponent } from '../../components/map/map.component';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

describe('CreateMessageComponent', () => {
  let component: CreateMessageComponent;
  let fixture: ComponentFixture<CreateMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMessageComponent, MapComponent ],
      imports: [
        FormsModule,
        LeafletModule.forRoot(),
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
