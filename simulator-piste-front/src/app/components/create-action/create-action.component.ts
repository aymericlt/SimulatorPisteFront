import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss']
})
export class CreateActionComponent implements OnInit {
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;

  createActionForm: FormGroup;

  constructor(private missionService: MissionService
  ) {
    this.createActionForm = new FormGroup({
      wording: new FormControl('', Validators.required),
      scoreMinimum: new FormControl('', Validators.required),
      previousActionId: new FormControl(''),
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.createActionForm.valid || this.createActionForm.value.previousActionId == '') {

      var createActionRequest = {};

      if (this.createActionForm.value.previousActionId == '') {
        createActionRequest = {
          wording: this.createActionForm.value.wording,
          scoreMinimum: parseInt(this.createActionForm.value.scoreMinimum, 10)
        }
      } else {
        createActionRequest = {
          wording: this.createActionForm.value.wording,
          scoreMinimum: parseInt(this.createActionForm.value.scoreMinimum, 10),
          previousActionId: parseInt(this.createActionForm.value.previousActionId, 10),
        }
      }

      console.log('Create action form', createActionRequest);

      this.missionService.createAction(createActionRequest).subscribe({
        next: (response: any) => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
        },
        error: (error: { messages: string }) => {
          this.showErrorMessage = true;
          this.showSuccessMessage = false;
          console.log('Create action failed: ', error.messages)
        }
      });
    }

  }
}
