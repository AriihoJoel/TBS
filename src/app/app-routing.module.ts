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
    component: HomePageComponent,
    title: 'Tukahiirwa Bernard Services | Fresh Food & Grocery Supply'
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Tukahiirwa Bernard Services | Fresh Food & Grocery Supply'
  },
  {
    path: 'request-quote',
    component: RequestQuoteComponent,
    title: 'Request Quote | Tukahiirwa Bernard Services'
  },
  {
    path: 'admin/login',
    component: LoginPageComponent,
    title: 'Admin | Tukahiirwa Bernard Services '
  },

  {
    path: 'admin/inquiries',
    component: AdminInquiriesComponent,
    canActivate: [authGuard],
    title: 'Inquiries | Tukahiirwa Bernard Services'

  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
