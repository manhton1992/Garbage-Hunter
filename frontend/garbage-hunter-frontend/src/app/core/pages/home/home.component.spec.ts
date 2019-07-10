import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MapComponent } from '../../components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AdminComponent } from '../admin/admin.component';
import { CreateMessageComponent } from '../create-message/create-message.component';
import { ShowMessageComponent } from '../show-message/show-message.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { AdminNumberBoxComponent } from '../../components/admin-number-box/admin-number-box.component';
import { ChartLineComponent } from '../../components/chart-line/chart-line.component';
import { ChartPieComponent } from '../../components/chart-pie/chart-pie.component';
import { ErrorComponent } from '../../components/error/error.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from '../edit/edit.component';
import { FlashComponent } from '../../components/flash/flash.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

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
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Title Garbage Hunter in h1 tag', async() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Garbage Hunter');
  })

  it('should have description in p tag', async() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Garbage Hunter is the application to report unused things that lies on the side of a street');
  })

  it('should have message', async() => {
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable().then(()=> {
      fixture.detectChanges();
      expect(component.messages.length).toBeGreaterThanOrEqual(1);
    })
  }) 

  it('should call getAllMessageCategories method', async() => {
    fixture.detectChanges();
    spyOn(component, 'getAllMessageCategories');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();
    expect(component.getAllMessageCategories).toHaveBeenCalledTimes(1);
  })

  it('should call clearFilter method', async() => {
    fixture.detectChanges();
    spyOn(component, 'clearFilter');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();
    expect(component.clearFilter).toHaveBeenCalledTimes(0);
  })
});
