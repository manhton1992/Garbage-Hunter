import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { AdminComponent } from './core/pages/admin/admin.component';
import { CreateMessageComponent } from './core/pages/create-message/create-message.component';
import { ShowMessageComponent } from './core/pages/show-message/show-message.component';
import { HomeComponent } from './core/pages/home/home.component';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { MapComponent } from './core/components/map/map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CommentComponent } from './core/components/comment/comment.component';
import { AdminNumberBoxComponent } from './core/components/admin-number-box/admin-number-box.component';
import { ChartLineComponent } from './core/components/chart-line/chart-line.component';
import { ChartPieComponent } from './core/components/chart-pie/chart-pie.component';
import { ErrorComponent } from './core/components/error/error.component';
import { EditComponent } from './core/pages/edit/edit.component';

@NgModule({
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
    EditComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgxChartsModule,
    LeafletModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
