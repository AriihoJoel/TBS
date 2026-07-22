import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface CompanyServices{
  id: number,
  name: string,
  description: string,
  iconName: string,
  isActive: string
}


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiBaseUrl = "https://localhost:7026/api";


  constructor(private http: HttpClient) { }

  getServices(){
    return this.http.get<CompanyServices[]>(`${this.apiBaseUrl}/services`);
  }
}
