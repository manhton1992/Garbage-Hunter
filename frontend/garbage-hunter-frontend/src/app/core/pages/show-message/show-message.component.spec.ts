import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessageComponent } from './show-message.component';
import { MapComponent } from '../../components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CommentComponent } from '../../components/comment/comment.component';
import { ErrorComponent } from '../../components/error/error.component';
import { AppComponent } from 'src/app/app.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AdminComponent } from '../admin/admin.component';
import { CreateMessageComponent } from '../create-message/create-message.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AdminNumberBoxComponent } from '../../components/admin-number-box/admin-number-box.component';
import { ChartLineComponent } from '../../components/chart-line/chart-line.component';
import { ChartPieComponent } from '../../components/chart-pie/chart-pie.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from '../edit/edit.component';
import { FlashComponent } from '../../components/flash/flash.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('ShowMessageComponent', () => {
  let component: ShowMessageComponent;
  let fixture: ComponentFixture<ShowMessageComponent>;
  let el: HTMLElement;

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
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(ShowMessageComponent);
      component = fixture.componentInstance;
    });;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have message', async() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(()=> {
      fixture.detectChanges();
      expect(component.message).not.toBeNull();
    })
  }) 
  
  it('should have Title in h1 tag', async() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(()=> {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain(component.message.title);
    })
  })
});
