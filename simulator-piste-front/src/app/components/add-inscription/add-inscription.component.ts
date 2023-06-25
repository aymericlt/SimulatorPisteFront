import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inscription',
  templateUrl: './add-inscription.component.html',
  styleUrls: ['./add-inscription.component.scss']
})
export class AddInscriptionComponent implements OnInit {
  allNotInsctibedMissions: any;

  constructor (private missionService: MissionService,
    private router: Router) { }

  ngOnInit(): void {
    console.log('add inscription component init');
    this.missionService.getNotInsctibedMissions().subscribe({
      next: (response: any) => {
        console.log('not inscribed missions received: ', response);
        this.allNotInsctibedMissions = response;
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }

  checkDataEmpty() {
    if (this.allNotInsctibedMissions == null) {
      return true;
    } else {
      const size = Object.keys(this.allNotInsctibedMissions).length;
      return this.allNotInsctibedMissions === undefined || size == 0;
    }
  }

  signToMission(missionid:number) {
    this.missionService.signToMission(missionid).subscribe({
      next: (response: any) => {
        console.log('sign to mission response: ', response);
        this.ngOnInit();
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }
}
