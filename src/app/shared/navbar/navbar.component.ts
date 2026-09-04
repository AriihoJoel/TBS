import { Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/auth.service';
import { AppRoutingModule } from "src/app/app-routing.module";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AppRoutingModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isNavScrolled = false;
  isMobileMenuOpen = false;

  constructor(public authService: AuthService){}
    @HostListener('window:scroll')
  onWindowScroll():void{
    this.isNavScrolled = window.scrollY > 20
  }

  toggleMobileMenu():void{
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu():void{
    this.isMobileMenuOpen = false;
  }

}
