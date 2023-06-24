import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorMessage: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router) {
        this.loginForm = new FormGroup({
          username: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required)
        });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
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
