import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-mission',
  templateUrl: './modify-mission.component.html',
  styleUrls: ['./modify-mission.component.scss']
})
export class ModifyMissionComponent implements OnInit {
  missionId: number;

  missionData: any;

  addMissionForm: FormGroup;
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;


  constructor(private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute) {
    this.missionId = -1;
    this.addMissionForm = new FormGroup({
      wording: new FormControl('', Validators.required),
      scoreMinimum: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.missionId = params['missionid'];
      console.log('missionId: ', this.missionId);
    });

    this.missionService.getSingleMission(this.missionId).subscribe({
      next: (response: any) => {
        this.missionData = response;
      }
    });

  }

  isDataLoaded() {
    return this.missionData != null;
  }

  deleteActionFromMission(actionId: number) {
    console.log('deleteActionFromMission: ', actionId);
    console.log('missionID ', this.missionId);

    this.missionService.deleteActionFromMission(this.missionId, actionId).subscribe({
      next: (response: any) => {
        this.ngOnInit();
      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    });
  }


}
