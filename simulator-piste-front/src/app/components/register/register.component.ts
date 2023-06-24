import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showErrorMessage: boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router) {
        this.registerForm = new FormGroup({
          surname: new FormControl('', Validators.required),
          forename: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          username: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required),
        });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (error: { messages: string }) => {
          this.showErrorMessage = true;
          console.log('Login failed: ', error.messages)
        }
      });
    }
  }

}
