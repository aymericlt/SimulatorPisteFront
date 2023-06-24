import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  userData: any = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMyAccount().subscribe({
      next: (response: any) => {
        this.userData = response;
      }
    });
  }
}
