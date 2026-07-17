import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminInquiriesComponent } from './pages/admin-inquiries/admin-inquiries.component';
import { authGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'admin/login',
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },
  {
    path: 'admin/inquiries',
    component: AdminInquiriesComponent,
    canActivate: [authGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
