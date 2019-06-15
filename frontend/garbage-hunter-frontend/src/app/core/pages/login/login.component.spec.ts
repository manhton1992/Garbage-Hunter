import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AdminComponent } from '../admin/admin.component';
import { CreateMessageComponent } from '../create-message/create-message.component';
import { ShowMessageComponent } from '../show-message/show-message.component';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { MapComponent } from '../../components/map/map.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { CreateCommentComponent } from '../../components/create-comment/create-comment.component';
import { AdminNumberBoxComponent } from '../../components/admin-number-box/admin-number-box.component';
import { ChartLineComponent } from '../../components/chart-line/chart-line.component';
import { ChartPieComponent } from '../../components/chart-pie/chart-pie.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { ErrorComponent } from '../../components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        NgxChartsModule,
        LeafletModule.forRoot(),
        NgbModule.forRoot(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
