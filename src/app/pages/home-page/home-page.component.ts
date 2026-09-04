import { Component, OnInit, OnDestroy,AfterViewInit,ElementRef,QueryList, ViewChildren} from '@angular/core';
import { CompanyServices, ServicesService } from 'src/app/core/services.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {
  faLeaf,
  faBasketShopping,
  faBuilding,
  faTruck,
  faClipboardList,
  faCircleCheck,
  faBoxOpen,
} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [RouterModule, CommonModule, FontAwesomeModule]
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {

  services : CompanyServices[] = [];
  loading = true;
  errorMessage = '';
  currentSlideIndex = 0;
  private heroTimer? : number;
  animateHeroText = true;
  animateHeroImage = true;
  private revealObserver? : IntersectionObserver;//detects when elements enter or exit the viewport and and triggers animations
  processGallery = [
    {image: '/assets/Images/bananas.jpg', alt: 'Fresh Matooke', label:'Matooke'},
    {image: '/assets/Images/chickens.jpg', alt: 'Fresh Chicken', label:'Poultry'}
  ];
 productColumns = [
  ['Maize flour', 'Rice', 'Sugar', 'Tea leaves', 'Matooke', 'Sweet potatoes', 'Cassava', 'Bogoya', 'Ndizi'],
  ['Vegetables', 'Tomatoes', 'Onions', 'Cabbages', 'Water melon', 'Pineapples', 'Passion fruits', 'Millet flour', 'Soya flour'],
  ['Eggs', 'Cooking oil', 'Beef', 'Chicken (off layers)', 'Fish', 'Beans', 'Peas', 'Groundnuts']
];
//finds all elements with #counter reference in HTML and creates a querylist collection of those elements.
  @ViewChildren('counter')
  counters!:QueryList<ElementRef<HTMLElement>>;
 
  private counterObserver? : IntersectionObserver;// Detects when a counter enters a viewport
  private animationFrames : number[] = []; //stores requestAnimationFrame IDs for cleanup

  serviceIcons : Record<string, IconDefinition> = {
    'leaf': faLeaf,
    'shopping-basket': faBasketShopping,
    'building': faBuilding,
    'truck': faTruck,
    'clipboard-list': faClipboardList,
    'badge-check': faCircleCheck,
  };
  getServiceIcon(iconName: string) :  IconDefinition{
    return this.serviceIcons[iconName] || faBoxOpen;
  }
//After View Renders
  ngAfterViewInit(): void {
    //Create an observer watching all counters
    this.counterObserver = new IntersectionObserver(
      entries => {
        //for each counter element, check if visible(50%+ in viewport), if not, wait until it becomes visible
        entries.forEach(entry => {
          if(!entry.isIntersecting){
            return;
          }

          //if visible, read data-target attribute, start animation, stop observing
          const counterElement = entry.target as HTMLElement;
          const target = Number(counterElement.dataset['target']);

          if(!Number.isNaN(target)){
            this.animateCounter(counterElement, target);
          }

          //Stop observing after the counter has run once.
          this.counterObserver?.unobserve(counterElement);
        });
      },
      {
        threshold: 0.5
      }
    );
    //Start observing each counter
    this.counters.forEach(counter => {
      this.counterObserver?.observe(counter.nativeElement);
    });

    const revealElements = this.elementRef.nativeElement.querySelectorAll('.reveal');//finds all elements with CSS class .reveal in the component.
    
  }

  private setupRevealObserver():void{
    if(!this.revealObserver){
      this.revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if(!entry.isIntersecting) return; //skip if not visible
          entry.target.classList.add('reveal-visible')//Add animation class
          this.revealObserver?.unobserve(entry.target);//stop observing once shown
        });
      },
      {threshold:0.15} //Trigger when 15% of the element is visible
    );
    const revealElements = this.elementRef.nativeElement.querySelectorAll('.reveal:not(.reveal-observed');// :not(.reveal-observed) so that a second call doesn't re-register elements already being watched
    revealElements.forEach((el:Element) => this.revealObserver?.observe(el));//begins to watch all .reveal elements
    }
  }
  private animateCounter(element: HTMLElement, target: number, duration = 1500): void{
    const startTime = performance.now();
    const suffix = element.dataset['suffix'] ??  '';

    const updateCounter = (currentTime:number) : void => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime/duration, 1);

      //Ease-out animation: starts quickly and slows near the target
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(target * easedProgress);

      element.textContent = `${currentValue}${suffix}`;

      if(progress < 1){
        const frameId = requestAnimationFrame(updateCounter);
        this.animationFrames.push(frameId);
      } else{
        element.textContent = `${target}${suffix}`;
      }
    };

    const frameId = requestAnimationFrame(updateCounter);
    this.animationFrames.push(frameId);
  }
  
  heroSlides = [
    //{
     // title: 'The freshest produce, handpicked for you',
     // text: 'We source directly from local farmers to bring you crisp vegetables, juicy fruits and quality ingredients delivered fresh to your doorstep.',
      //image: '/assets/Images/produce-crate.jpg'
   // },
    {
      title: 'Quality Matooke, delivered fresh',
      text: 'Sourced from the best farms in western Uganda. We deliver matooke at the perfect stage for every meal.',
      image: '/assets/Images/Matooke2.jpeg'
    },
    {
      title: 'Fresh chicken, offlayers or broilers',
      text: 'Healthy whole birds perfect for family meals, restaurants and events',
      image: '/assets/Images/chickens.jpg'
    },
    {
      title: 'Fresh beef, butchered to your preference',
      text: 'We work with quality-assured butcheries to bring you fresh, hygienically handled beef cuts for every order.Fresh local beef expertly butchered prime cuts.',
      image: '/assets/Images/Beef1.jpeg'

    },
    {
      title: 'All your kitchen essentials in one order',
      text: 'Cooking oil, rice, spices, flour and more. We stock all the groceries you need alongside fresh produce for complete meal solutions.',
      image: '/assets/Images/groceries.png'
    },
    {
      title: 'Direct delivery, straight from the source',
      text: 'Our team personally inspects and hand-delivers every order fresh and on time. We take care of the logistics, so you can focus on what matters most.',
      image: '/assets/Images/Delivery1.jpeg'
    },
    {
      title: 'Trusted by Watoto and other organizations',
      text: 'We are proud to be the preferred supplier for organizations like Watoto and others providing quality food and produce.',
      image: '/assets/Images/Delivery2.jpeg'
    }
  ]

  getCurrentSlide(){
    return this.heroSlides[this.currentSlideIndex];
  }

  setHeroSlide(index:number){
    this.currentSlideIndex = index;
    this.triggerHeroImageAnimation();
    this.triggerHeroAnimationText();
  }

  nextHeroSlide(){
    this.currentSlideIndex = this.currentSlideIndex === this.heroSlides.length-1 ? 0 : this.currentSlideIndex + 1;
    this.triggerHeroImageAnimation();
    this.triggerHeroAnimationText();
  }

  previousHeroSlide(){
    this.currentSlideIndex = this.currentSlideIndex === 0 ? this.heroSlides.length - 1 : this.currentSlideIndex - 1;
    this.triggerHeroImageAnimation();
    this.triggerHeroAnimationText();
  }

  triggerHeroAnimationText(){
    this.animateHeroText = false;
    setTimeout(() =>{
      this.animateHeroText = true;
    }, 20);
  }

  triggerHeroImageAnimation(){
    this.animateHeroImage = false;
    setTimeout(() =>{
      this.animateHeroImage = true;
    }, 20);
  }

  constructor(private companyServices : ServicesService,
    private elementRef: ElementRef
  ){}


  ngOnInit(): void {

    this.companyServices.getServices().subscribe({
      next: data => {
        this.services = data;
        this.loading = false;
        this.startHeroAutoSlide();
        setTimeout(() => this.setupRevealObserver(), 0);
       
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
    //clean up everything!
    this.counterObserver?.disconnect();
    this.revealObserver?.disconnect();
    this.animationFrames.forEach(frameId => {
      cancelAnimationFrame(frameId);
    })
  }

}
