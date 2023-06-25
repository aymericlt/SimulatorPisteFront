import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.scss']
})
export class CreateMissionComponent implements OnInit {
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;

  allActions: any;

  createMissionForm: FormGroup;

  constructor(private missionService: MissionService,
    private router: Router
  ) {
    this.createMissionForm = new FormGroup({
      wording: new FormControl('', Validators.required),
      actionList: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.missionService.getAllActions().subscribe({
      next: (response: any) => {
        this.allActions = response;
      }
    });
  }

  convertStringToNumberList(input: string): number[] {
    return input.split(',').map(Number);
  }
  

  onSubmit(): void {
    console.log('Create mission form', this.createMissionForm.value);
    if (this.createMissionForm.valid) {
      const missionCreationRequest = {
        wording: this.createMissionForm.value.wording,
      }
      const myArray = this.convertStringToNumberList(this.createMissionForm.value.actionList)

      console.log('Create mission form', missionCreationRequest);
      console.log('and also form', myArray);
      this.missionService.createMission(missionCreationRequest, myArray).subscribe({
        next: (response: any) => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.router.navigate(['/mission']);
        },
        error: (error: { messages: string }) => {
          this.showErrorMessage = true;
          this.showSuccessMessage = false;
          console.log('Create mission failed: ', error.messages)
        }
      });
    }
  }

}
