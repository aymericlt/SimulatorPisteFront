import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-action',
  templateUrl: './my-action.component.html',
  styleUrls: ['./my-action.component.scss']
})
export class MyActionComponent implements OnInit {
  inscriptionId: number;
  actionId: number;

  actionData: any;

  constructor(private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute) {
    this.inscriptionId = -1;
    this.actionId = -1;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inscriptionId = params['inscriptionid'];
      this.actionId = params['actionid'];
      console.log('inscriptionId: ', this.inscriptionId);
      console.log('actionId: ', this.actionId);
    });

    this.missionService.getMyActionIndicators(this.inscriptionId, this.actionId)
      .subscribe({
        next: (response: any) => {
          this.actionData = response;
        },
        error: (error: any) => {
          console.log('error', error);
        }
    });
  }

  isDataLoaded() : boolean {
    return this.actionData !== undefined;
  }

  markIndicatorAsDone(inscriptionId: number, actionId: number, indicatorId: number) {
    this.missionService.markIndicatorAsDone(inscriptionId, actionId, indicatorId)
      .subscribe({
        next: (response: any) => {
          console.log('indicator state changed (done/undone): ', response);
          window.location.reload(); //Possiblement changeable
        },
        error: (error: any) => {
          console.log('error', error);
        }
    });
  }

  indicatorIsDone(indicator: any): boolean {
    return indicator.inscriptionIndicatorDto.done;
  }

}
