import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

interface AdminLoginRequest{
  username: string;
  password: string;
}

interface AdminLoginResponse{
  username: string;
  role: string;
  token: string;
  expiresAt: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiBaseUrl = "https://localhost:7026/api";
  private readonly tokenKey = "tbs-Admin-token";

  constructor(private http : HttpClient) {}

  login(request : AdminLoginRequest){
    return this.http.post<AdminLoginResponse>(`${this.apiBaseUrl}/auth/admin/login`,request)
    .pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
    
  } 

  getToken(){
  return localStorage.getItem(this.tokenKey);
  }

  logout(){
    return localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(){
    return !!this.getToken(); //converts the token value into a boolean (true/false) and it Returns true if the user is logged in, false if not
  }

}




