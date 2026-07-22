import { Component } from '@angular/core';
import { FormBuilder, Validators,FormGroup ,ReactiveFormsModule } from '@angular/forms';
import { InquiryService } from 'src/app/core/inquiry.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-quote',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './request-quote.component.html',
  styleUrls: ['./request-quote.component.scss']
})
export class RequestQuoteComponent {

  loading = false;
  errorMessage = '';
  successMessage = '';

  services = [
    'Fresh Food Supply',
    'Grocery Supply',
    'Bulk Institutional Supply',
    'Delivery Services',
    'Custom Food Orders',
    'Quality Sourcing'
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

  submit(){
    if(this.quoteForm.invalid){
      this.quoteForm.markAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.inquiryService.createInquiry(this.quoteForm.getRawValue()).subscribe({
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


