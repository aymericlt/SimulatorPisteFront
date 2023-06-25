import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient,
    private router: Router) { }

  getMyMissions() {
    return this.http.get<any>(`${environment.apiServerUrl}/inscription`)
      .pipe(tap(response => {
        console.log('getMyMissions response', response);
      }));
  }

  getMyMissionIndicators(inscriptionId: number, actionId: number) {
    return this.http.get<any>(`${environment.apiServerUrl}/inscription/${inscriptionId}/action/${actionId}`)
      .pipe(tap(response => {
        console.log('getMyMissionIndicators response', response);
      }));
  }

  markIndicatorAsDone(inscriptionId: number, actionId: number, indicatorId: number) {
    return this.http.patch<any>(`${environment.apiServerUrl}/inscription/${inscriptionId}/action/${actionId}/indicator/${indicatorId}`, {})
      .pipe(tap(response => {
        console.log('markIndicatorAsDone response', response);
      }));
  }

  getNotInsctibedMissions() {
    return this.http.get<any>(`${environment.apiServerUrl}/inscription/notInscribed`)
      .pipe(tap(response => {
        console.log('getNotInsctibedMissions response', response);
      }));
  }

  signToMission(missionid: number) : Observable<any> {
    return this.http.patch<any>(`${environment.apiServerUrl}/inscription/${missionid}`, {})
      .pipe(tap(response => {
        console.log('signToMission response', response);
      }));
  }


}
