import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-actions',
  templateUrl: './all-actions.component.html',
  styleUrls: ['./all-actions.component.scss']
})
export class AllActionsComponent implements OnInit {
    allActions: any;
  
    constructor(private missionService: MissionService,
      private router: Router) { }
  
    ngOnInit(): void {
      this.missionService.getAllActions().subscribe({
        next: (response: any) => {
          this.allActions = response;
        }
      });
    }

    modifyAction(actionId: number) {
      console.log('modify action', actionId);
      this.router.navigate([`/action/${actionId}`]);
    }

    deleteAction(actionId: number) {
      this.missionService.deleteAction(actionId).subscribe({
        next: (response: any) => {
          console.log('action deleted :', response);
          this.allActions = this.allActions.filter((action: any) => action.id !== actionId);
        }
      });
    }
}
