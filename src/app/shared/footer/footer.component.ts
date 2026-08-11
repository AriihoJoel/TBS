import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "src/app/app-routing.module";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AppRoutingModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
currentYear = new Date().getFullYear();
showBackToTop = false;

@HostListener('window:scroll')
onWindowScroll() : void{
  this.showBackToTop = window.scrollY > 400;
}

scrollToTop() : void{
  window.scrollTo({top: 0, behavior: 'smooth'});
}
}
