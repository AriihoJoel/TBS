import { Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isNavScrolled = false;

    @HostListener('window:scroll')
  onWindowScroll():void{
    this.isNavScrolled = window.scrollY > 20
  }

}
