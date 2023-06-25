import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getMyActionIndicators(inscriptionId: number, actionId: number) {
    return this.http.get<any>(`${environment.apiServerUrl}/inscription/${inscriptionId}/action/${actionId}`)
      .pipe(tap(response => {
        console.log('getMyActionIndicators response', response);
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

  getAllActions(): Observable<any> {
    return this.http.get<any>(`${environment.apiServerUrl}/action`)
      .pipe(tap(response => {
        console.log('getAllActions response', response);
      }));
  }

  deleteAction(actionId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiServerUrl}/action/${actionId}`)
      .pipe(tap(response => {
        console.log('deleteAction response', response);
      }));
  }

  getSingleAction(actionId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiServerUrl}/action/${actionId}`)
      .pipe(tap(response => {
        console.log('getSingleAction response', response);
      }));
  }

  deleteIndicator(indicatorId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiServerUrl}/indicator/${indicatorId}`)
      .pipe(tap(response => {
        console.log('deleteIndicator response', response);
      }));
  }

  addIndicator(indicator: any): Observable<any> {
    return this.http.post<any>(`${environment.apiServerUrl}/indicator/add`, indicator)
      .pipe(tap(response => {
        console.log('addIndicator response', response);
      }));
  }

  createAction(action: any): Observable<any> {
    return this.http.post<any>(`${environment.apiServerUrl}/action/add`, action)
      .pipe(tap(response => {
        console.log('createAction response', response);
      }));
  }

  getAllMissions(): Observable<any> {
    return this.http.get<any>(`${environment.apiServerUrl}/mission`)
      .pipe(tap(response => {
        console.log('getAllMissions response', response);
      }));
  }

  deleteMission(missionId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiServerUrl}/mission/${missionId}`)
      .pipe(tap(response => {
        console.log('deleteMission response', response);
      }));
  }

  getSingleMission(missionId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiServerUrl}/mission/${missionId}`)
      .pipe(tap(response => {
        console.log('getSingleMission response', response);
      }));
  }

  deleteActionFromMission(missionId: number, actionId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiServerUrl}/mission/${missionId}/${actionId}`)
      .pipe(tap(response => {
        console.log('deleteActionFromMission response', response);
      }));
  }

  // @PostMapping("/add")
  //   @PreAuthorize("hasAuthority('admin')")
  //   public ResponseEntity<?> createMission(@RequestBody MissionDto missionDto, @RequestParam("actionList") List<Integer> actionIds ){
  //       try{
  //           missionService.createMission(missionDto, actionIds);
  //           return ResponseEntity.ok().build();
  //       }
  //       catch (Exception e){
  //           return ResponseEntity.badRequest().body(e.getMessage());
  //       }
  //   }

  createMission(mission: any, actionIds: number[]): Observable<any> {
    let params = new HttpParams();
    actionIds.forEach(id => params = params.append('actionList', id.toString()));

    return this.http.post<any>(`${environment.apiServerUrl}/mission/add`, mission, { params: params })
      .pipe(tap(response => {
        console.log('createMission response', response);
      }));
  }

}
