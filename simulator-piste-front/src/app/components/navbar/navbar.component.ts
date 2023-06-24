import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  userRole: string = 'none';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLogged = true;
      if (this.authService.getUser().roles.includes('admin')) {
        this.userRole = 'admin';
      } else {
        this.userRole = 'user';
      }
    } else {
      this.isLogged = false;
      this.userRole = 'none';
    }
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  isLoggedAsUser(): boolean {
    return this.isLogged && this.userRole === 'user';
  }

  isLoggedAsAdmin(): boolean {
    return this.isLogged && this.userRole === 'admin';
  }

  logout(): void {
    this.authService.logout();
    this.isLogged = false;
    this.userRole = 'none';
  }

  getUsername(): string {
    if (this.userRole === 'admin') 
      return this.authService.getUser().username + " (admin)";
    else
      return this.authService.getUser().username;
    
  }
}

