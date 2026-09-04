import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators,FormGroup ,ReactiveFormsModule } from '@angular/forms';
import { InquiryService } from 'src/app/core/inquiry.service';
import { CommonModule } from '@angular/common';

declare var grecaptcha: any;
@Component({
  selector: 'app-request-quote',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './request-quote.component.html',
  styleUrls: ['./request-quote.component.scss']
})
export class RequestQuoteComponent {
  @ViewChild('recaptcha') recaptchaEl! : ElementRef<HTMLDivElement>;
  private recaptchaWidgetId : number | null = null;
  captchaToken : string | null = null;


  loading = false;
  errorMessage = '';
  successMessage = '';

  services = [
    'Fresh Food Supply',
    'Grocery Supply',
    'Bulk Institutional Supply',
    'Delivery Services',
    'Custom Food Orders',
    'Quality Sourcing',
    'Other'
  ];

  constructor(
    private fb : FormBuilder,
    private inquiryService : InquiryService
  ){}

  quoteForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    companyName: [''],
    phoneNumber: ['', Validators.required],
    emailAddress: ['', Validators.required],
    requestedService: ['', Validators.required],
    message: ['', Validators.required]
  });

  ngAfterViewInit(): void{
    this.renderRecaptcha();
  }

  private renderRecaptcha():void{
    if (typeof grecaptcha === 'undefined' || !grecaptcha.render){
      setTimeout(() => this.renderRecaptcha(), 200);
      return;
    }
    this.recaptchaWidgetId = grecaptcha.render(this.recaptchaEl.nativeElement,{
      'sitekey': '6LfNPaUtAAAAAKgnE8ZWDal12hTv-oFGxuzHnC35',
      callback: (token:string) => {this. captchaToken = token;},
      'expired-callback': () => {this.captchaToken = null;}
    });
  }
  private resetCaptcha() : void{
      this.captchaToken = null;
      if(this.recaptchaWidgetId !== null && typeof grecaptcha !== 'undefined'){
        grecaptcha.reset(this.recaptchaWidgetId);
      }
  }
  submit(){
    if(this.quoteForm.invalid){
      this.quoteForm.markAsTouched();
      return;
    }
    if(!this.captchaToken){
      this.errorMessage = 'Please complete the reCAPTCHA before submitting the form.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.inquiryService.createInquiry({
      ...this.quoteForm.getRawValue(),
      captchaToken: this.captchaToken
    }).subscribe({
      next: () => {
        this.successMessage = 'Your request has been sent successfully. We will contact you soon.';
        this.loading = false;
        this.quoteForm.reset();
      },

      error: () => {
        this.errorMessage = 'Something went wrong. Please try again.',
        this.loading = false;
      }
    });
  }

  }


