import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AdminResponse{
  id: number;
  fullName: string;
  companyName: string,
  phoneNumber: string;
  emailAddress: string;
  requestedService: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface CreateInquiry{
  fullName: string;
  companyName: string;
  phoneNumber: string;
  emailAddress: string;
  requestedService: string;
  message: string;
  captchaToken: string;
}

@Injectable({
  providedIn: 'root'
})



export class InquiryService {
  private readonly apiBaseUrl = "https://localhost:7026/api"

  constructor(private http : HttpClient) { }

  getInquiries(){
    return this.http.get<AdminResponse[]>(`${this.apiBaseUrl}/admin/inquiries`);
  }

  createInquiry(request: CreateInquiry){
    return this.http.post(`${this.apiBaseUrl}/inquiries`, request);
  }
}
