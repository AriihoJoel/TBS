import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { AdminResponse, InquiryService } from 'src/app/core/inquiry.service';

@Component({
  selector: 'app-admin-inquiries',
  templateUrl: './admin-inquiries.component.html',
  styleUrls: ['./admin-inquiries.component.scss']
})
export class AdminInquiriesComponent implements OnInit{

  inquiries : AdminResponse[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private authService : AuthService,
    private router : Router,
    private inquiryService : InquiryService
  ){}

  ngOnInit(): void {
    this.inquiryService.getInquiries().subscribe({
      next: inquiries  => {
        this.inquiries = inquiries;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load inquiries';
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('admin/login');
    }
}
