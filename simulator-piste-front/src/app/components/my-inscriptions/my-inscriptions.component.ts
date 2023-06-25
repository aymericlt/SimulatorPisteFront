import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-inscriptions',
  templateUrl: './my-inscriptions.component.html',
  styleUrls: ['./my-inscriptions.component.scss']
})
export class MyInscriptionsComponent implements OnInit {
  myMissions: any;

  constructor(private missionService: MissionService,
    private router: Router) {
      this.myMissions = null;
  }

  ngOnInit(): void {
    this.missionService.getMyMissions().subscribe({
      next: (response: any) => {
        this.myMissions = response;
        console.log('myMissions: ', this.myMissions);
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }

  isActionDone(action: any) {
    return action.score >= action.fkActionScoreMinimum;
  }

  checkDataEmpty() {
    if (this.myMissions == null) {
      return true;
    } else {
      const size = Object.keys(this.myMissions).length;
      return this.myMissions === undefined || size == 0;
    }
  }

  routeTo(inscriptionId: number, actionId: number) {
    this.router.navigate([`/inscription/${inscriptionId}/action/${actionId}`]);
  }
}
