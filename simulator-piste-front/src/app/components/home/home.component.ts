import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
    constructor(private authService: AuthService) {}
  
    ngOnInit(): void {

    }

    isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
    }

    isLoggedInAsAdmin(): boolean {
      return this.authService.isLoggedInAsAdmin();
    }

    getUsername(): string {
      return this.authService.getUser().username;
    }
}
