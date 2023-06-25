import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface LoginResponse {
  id: number;
  username: string;
  roles: string[];
  tokenType: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(credentials: {username: string, password: string}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/login`, credentials)
      .pipe(tap(response => {
        console.log('response', response);
        localStorage.setItem('accessToken', response.accessToken);
        var userData = {
          id: response.id,
          username: response.username,
          roles: response.roles
        }
        localStorage.setItem('userData', JSON.stringify(userData));
      }));
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/register`, user)
      .pipe(tap(response => {
        console.log('response', response);
        localStorage.setItem('accessToken', response.accessToken);
        var userData = {
          id: response.id,
          username: response.username,
          roles: response.roles
        }
        localStorage.setItem('userData', JSON.stringify(userData));
      }));
  }


  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  isLoggedInAsAdmin(): boolean {
    return this.isLoggedIn() && this.getUser().roles.includes('admin');
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  }
}
