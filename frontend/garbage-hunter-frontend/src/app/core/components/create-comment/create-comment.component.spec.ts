import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentComponent } from './create-comment.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { AdminComponent } from '../../pages/admin/admin.component';
import { CreateMessageComponent } from '../../pages/create-message/create-message.component';
import { ShowMessageComponent } from '../../pages/show-message/show-message.component';
import { HomeComponent } from '../../pages/home/home.component';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { MapComponent } from '../map/map.component';
import { CommentComponent } from '../comment/comment.component';
import { AdminNumberBoxComponent } from '../admin-number-box/admin-number-box.component';
import { ChartLineComponent } from '../chart-line/chart-line.component';
import { ChartPieComponent } from '../chart-pie/chart-pie.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { ErrorComponent } from '../error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent;
  let fixture: ComponentFixture<CreateCommentComponent>;

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
        CreateCommentComponent,
        AdminNumberBoxComponent,
        ChartLineComponent,
        ChartPieComponent,
        CommentListComponent,
        ErrorComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        NgxChartsModule,
        LeafletModule.forRoot(),
        NgbModule.forRoot(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
