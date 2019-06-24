import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AppComponent } from 'src/app/app.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AdminComponent } from '../admin/admin.component';
import { CreateMessageComponent } from '../create-message/create-message.component';
import { ShowMessageComponent } from '../show-message/show-message.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { MapComponent } from '../../components/map/map.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { AdminNumberBoxComponent } from '../../components/admin-number-box/admin-number-box.component';
import { ChartLineComponent } from '../../components/chart-line/chart-line.component';
import { ChartPieComponent } from '../../components/chart-pie/chart-pie.component';
import { ErrorComponent } from '../../components/error/error.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from '../edit/edit.component';
import { FlashComponent } from '../../components/flash/flash.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

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
        AdminNumberBoxComponent,
        ChartLineComponent,
        ChartPieComponent,
        ErrorComponent,
        EditComponent,
        FlashComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        LeafletModule.forRoot(),
        NgbModule.forRoot(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
