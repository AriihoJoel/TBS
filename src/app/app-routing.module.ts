import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminInquiriesComponent } from './pages/admin-inquiries/admin-inquiries.component';
import { authGuard } from './core/auth.guard';
import { RequestQuoteComponent } from './pages/request-quote/request-quote.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'request-quote',
    component: RequestQuoteComponent
  },
  {
    path: 'admin/login',
    component: LoginPageComponent
  },

  {
    path: 'admin/inquiries',
    component: AdminInquiriesComponent,
    canActivate: [authGuard]

  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
