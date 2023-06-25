import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-missions',
  templateUrl: './all-missions.component.html',
  styleUrls: ['./all-missions.component.scss']
})
export class AllMissionsComponent implements OnInit{
  allMissions: any;

  constructor(private missionService: MissionService,
    private router: Router) { }

  ngOnInit(): void {
    this.missionService.getAllMissions().subscribe({
      next: (response: any) => {
        this.allMissions = response;
      }
    });
  }

  modifyMission(missionId: number) {
    console.log('modify action', missionId);
    this.router.navigate([`/mission/${missionId}`]);
  }


  deleteMission(missionId: number) {
    console.log('deleteMission', missionId);
    this.missionService.deleteMission(missionId).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }
}
