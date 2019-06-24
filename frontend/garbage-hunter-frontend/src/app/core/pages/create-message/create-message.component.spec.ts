import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMessageComponent } from './create-message.component';
import { MapComponent } from '../../components/map/map.component';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { FlashComponent } from '../../components/flash/flash.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AdminComponent } from '../admin/admin.component';
import { ShowMessageComponent } from '../show-message/show-message.component';
import { RegisterComponent } from '../register/register.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { AdminNumberBoxComponent } from '../../components/admin-number-box/admin-number-box.component';
import { ChartLineComponent } from '../../components/chart-line/chart-line.component';
import { ChartPieComponent } from '../../components/chart-pie/chart-pie.component';
import { ErrorComponent } from '../../components/error/error.component';
import { EditComponent } from '../edit/edit.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('CreateMessageComponent', () => {
  let component: CreateMessageComponent;
  let fixture: ComponentFixture<CreateMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent,
        HeaderComponent,
        AdminComponent,
        CreateMessageComponent,
        ShowMessageComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MapComponent,
        CommentComponent,
        AdminNumberBoxComponent,
        ChartLineComponent,
        ChartPieComponent,
        ErrorComponent,
        EditComponent,
        FlashComponent
      ],
      imports: [
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        LeafletModule.forRoot(),
        NgbModule.forRoot(),
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
