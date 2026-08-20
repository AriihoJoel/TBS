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
  searchTerm:string = '';
  loading = true;
  errorMessage = '';
  filteredInquiries : AdminResponse[] = [];
  currentPage = 1;
  pageSize = 5;
 

  constructor(
    private authService : AuthService,
    private router : Router,
    private inquiryService : InquiryService
  ){}

  ngOnInit(): void {
    this.inquiryService.getInquiries().subscribe({
      next: inquiries  => {
        this.inquiries = inquiries;
        console.log(inquiries);
        this.filteredInquiries = inquiries;
        this.currentPage = 1;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load inquiries';
        this.loading = false;
      }
    });
  }

  get totalPages(): number{
    return Math.max(1,Math.ceil(this.filteredInquiries.length / this.pageSize))
  }

  get pageNumbers(): number[]{
    return Array.from({length: this.totalPages}, (_, i) => i + 1); //generates an array for pagination controls
  }

  get pagedInquiries(): AdminResponse[]{
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredInquiries.slice(start, start + this.pageSize);//returns only items for the current page
  }

  goToPage(page: number): void{
    if(page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  nextPage(): void{
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void{
    this.goToPage(this.currentPage - 1);
  }
  //Search Filter
  onSearch(event:Event){
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.filterInquiries();
  }

  filterInquiries(){
    if(!this.searchTerm || this.searchTerm.trim() === '')
      {
        this.filteredInquiries = this.inquiries;
        return;
      }

    const searchLower = this.searchTerm.toLowerCase().trim();

    this.filteredInquiries = this.inquiries.filter(inquiries =>{
      //search multiple fields
      return(
        inquiries.fullName?.toLowerCase().includes(searchLower)||
        inquiries.companyName?.toLowerCase().includes(searchLower)||
        inquiries.emailAddress?.toLowerCase().includes(searchLower)||
        inquiries.phoneNumber?.toLowerCase().includes(searchLower)||
        inquiries.message?.toLowerCase().includes(searchLower)||
        inquiries.requestedService?.toLowerCase().includes(searchLower)||
        inquiries.status?.toLowerCase().includes(searchLower)
      );
    });
    this.currentPage = 1;
  }

  //Clear search
  clearSearch(){
    this.searchTerm = '';
    this.filteredInquiries = this.inquiries;
    this.currentPage = 1;
     //Clear Input field
    const input = document.querySelector('.search-input') as HTMLInputElement;
    if(input){
      input.value = '';
      input.focus();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('admin/login');
    }
    
}
