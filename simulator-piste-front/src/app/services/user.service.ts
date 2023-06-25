import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private router: Router) { }

  getMyAccount(): Observable<any> {
    return this.http.get<any>(`${environment.apiServerUrl}/user/me`)
      .pipe(tap(response => {
        console.log('response', response);
      }));
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.apiServerUrl}/user`)
      .pipe(tap(response => {
        console.log('response', response);
      }));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiServerUrl}/user/${id}`)
      .pipe(tap(response => {
        console.log('response', response);
      }));
  }

  updateRole(userUpdateRequest: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiServerUrl}/user/role`, userUpdateRequest)
      .pipe(tap(response => {
        console.log('response', response);
      }));
  }

  changePassword(userUpdateRequest: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiServerUrl}/user`, userUpdateRequest)
      .pipe(tap(response => {
        console.log('response', response);
      }));
  }


}
