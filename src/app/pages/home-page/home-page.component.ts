import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyServices, ServicesService } from 'src/app/core/services.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [RouterModule, CommonModule]
})
export class HomePageComponent implements OnInit, OnDestroy {

  services : CompanyServices[] = [];
  loading = true;
  errorMessage = '';
  currentSlideIndex = 0;
  private heroTimer? : number;

  heroSlides = [
    {
      title: 'The freshest produce, handpicked for you',
      text: 'We source directly from local farmers to bring you crisp vegetables, juicy fruits and quality ingredients delivered fresh to your doorstep.',
      image: '/assets/Images/produce-crate.jpg'
    },
    {
      title: 'Quality Matooke, delivered fresh',
      text: 'Sourced from the best farms in western Uganda. We deliver matooke at the perfect stage for every meal.',
      image: '/assets/Images/bananas.jpg'
    },
    {
      title: 'Fresh chicken, offlayers or broilers',
      text: 'Healthy whole birds perfect for family meals, restaurants and events',
      image: '/assets/Images/chickens.jpg'
    },
    {
      title: 'Fresh beef, butchered to your preference',
      text: 'Fresh local beef expertly butchered fresh daily from stew meat to prime cuts. We deliver the quality prime cuts your recipes  deserve',
      image: '/assets/Images/beef.png'

    },
    {
      title: 'All your kitchen essentials in one order',
      text: 'Cooking oil, rice, spices, flour and more. We stock all the groceries you need alongside fresh produce for complete meal solutions.',
      image: '/assets/Images/groceries.png'
    }
  ]

  getCurrentSlide(){
    return this.heroSlides[this.currentSlideIndex];
  }

  setHeroSlide(index:number){
    this.currentSlideIndex = index;
  }

  nextHeroSlide(){
    this.currentSlideIndex = this.currentSlideIndex === this.heroSlides.length-1 ? 0 : this.currentSlideIndex + 1;
  }

  previousHeroSlide(){
    this.currentSlideIndex = this.currentSlideIndex === 0 ? this.heroSlides.length - 1 : this.currentSlideIndex - 1;
  }

  constructor(private companyServices : ServicesService){}


  ngOnInit(): void {

    this.companyServices.getServices().subscribe({
      next: data => {
        this.services = data;
        this.loading = false;
        this.startHeroAutoSlide();
       
      },

      error: () => {
        this.errorMessage = 'Could not load services.';
        this.loading = false;
      }
    });
  }

  startHeroAutoSlide(){
    this.stopHeroAutoSlide();
    this.heroTimer = window.setInterval(() => {
      this.nextHeroSlide();
    }, 5000);
  }

  stopHeroAutoSlide(){
    if(this.heroTimer){
      window.clearInterval(this.heroTimer);
      this.heroTimer = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stopHeroAutoSlide();
  }

}
