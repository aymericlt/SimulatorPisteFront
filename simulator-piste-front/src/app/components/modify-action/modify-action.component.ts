import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-action',
  templateUrl: './modify-action.component.html',
  styleUrls: ['./modify-action.component.scss']
})
export class ModifyActionComponent implements OnInit {
  actionId: number;

  actionData: any;

  addIndicatorForm: FormGroup;
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;
  

  constructor(private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute) {
    this.actionId = -1;

    this.addIndicatorForm = new FormGroup({
      wording: new FormControl('', Validators.required),
      valueIfCheck: new FormControl('', Validators.required),
      valueIfUnCheck: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actionId = params['actionid'];
      console.log('actionId: ', this.actionId);
    });

    this.missionService.getSingleAction(this.actionId).subscribe({
      next: (response: any) => {
        this.actionData = response;
      },
      error: (error: any) => {
        console.log('error getSingleAction: ', error);
      }
    });

  }

  isDataLoaded() : boolean {
    return this.actionData !== undefined;
  }

  checkDataEmpty() {
    if (this.actionData.indicators == null) {
      return true;
    } else {
      const size = Object.keys(this.actionData.indicators).length;
      return this.actionData.indicators === undefined || size == 0;
    }
  }

  deleteIndicator(indicatorId: number) {
    this.missionService.deleteIndicator(indicatorId).subscribe({
      next: (response: any) => {
        console.log('indicator deleted :', response);
        this.actionData.indicators = this.actionData.indicators.filter((indicator: any) => indicator.id !== indicatorId);
      }
    });
  }

  onSubmit() {
    if (this.addIndicatorForm.valid) {
      const indicatorDto = {
        wording: this.addIndicatorForm.value.wording,
        valueIfCheck: parseInt(this.addIndicatorForm.value.valueIfCheck),
        valueIfUnCheck: parseInt(this.addIndicatorForm.value.valueIfUnCheck),
        fkActionId: this.actionId
      };
      console.log(indicatorDto);
      this.missionService.addIndicator(indicatorDto).subscribe({
        next: (response: any) => {
          console.log('indicator added :', response);
          this.showErrorMessage = false;
          this.showSuccessMessage = true;
          window.location.reload();
        }, error: (error: any) => {
          console.log('error :', error);
          window.location.reload();
        }
      });
    } else {
      this.showErrorMessage = true;
      this.showSuccessMessage = false;
      console.log('form invalid content :', this.addIndicatorForm.value);
    }
  }

}
