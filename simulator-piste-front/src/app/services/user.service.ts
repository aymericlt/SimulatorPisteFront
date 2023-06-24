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
}
