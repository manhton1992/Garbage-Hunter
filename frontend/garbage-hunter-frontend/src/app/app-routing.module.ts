import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { CreateMessageComponent } from './core/pages/create-message/create-message.component';
import { ShowMessageComponent } from './core/pages/show-message/show-message.component';
import { AdminComponent } from './core/pages/admin/admin.component';
import { EditComponent } from './core/pages/edit/edit.component';
import { AuthAdminService } from './services/auth/auth-admin/auth-admin.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'messages/create', component: CreateMessageComponent },
  { path: 'messages/:messageid', component: ShowMessageComponent },
  { path: 'messages/:messageid/edit', component: EditComponent },
  { path: 'admin', canActivate: [AuthAdminService], component: AdminComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
