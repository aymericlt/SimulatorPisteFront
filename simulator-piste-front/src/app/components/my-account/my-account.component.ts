import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  userData: any = {};
  changePasswordForm: FormGroup;
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;


  constructor(private userService: UserService,
    private authService: AuthService) {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPassword2: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.userService.getMyAccount().subscribe({
      next: (response: any) => {
        this.userData = response;
      }
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const userUpdateRequest = {
        id: this.userData.id.toString(),
        role : this.userData.role,
        oldPassword: this.changePasswordForm.value.oldPassword,
        newPassword: this.changePasswordForm.value.newPassword,
        newPassword2: this.changePasswordForm.value.newPassword2
      };
      console.log(userUpdateRequest);
      this.userService.changePassword(userUpdateRequest).subscribe({
        next: (response: any) => {
          console.log('password changed :', response);
          this.showErrorMessage = false;
          this.showSuccessMessage = true;
        },
        error: (error: any) => {
          console.log('error :', error);
          this.showErrorMessage = true;
          this.showSuccessMessage = false;
        }
      });
    }
  }

  isLoggedAsAdmin(): boolean {
    return this.authService.isLoggedIn() && this.authService.getUser().roles.includes('admin');
  }
}
