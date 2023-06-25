import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  allUsers: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        this.allUsers = response;
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (response: any) => {
        console.log('user deleted :', response);
        this.allUsers = this.allUsers.filter((user: any) => user.id !== id);
      }
    });
  }

  updateRole(_id: number, _role: string) {
    const wantedRole = _role === 'admin' ? 'user' : 'admin';
    const userUpdateRequest = {
      id: _id,
      role : wantedRole
    };

    this.userService.updateRole(userUpdateRequest).subscribe({
      next: (response: any) => {
        console.log('user role updated :', response);
        //Verif ça
        this.allUsers = this.allUsers.map((user: any) => {
          if (user.id === _id) {
            user.role = wantedRole;
          }
          return user;
        });
        ////
      },
      error: (error: any) => {
        console.log('error updating role:', error);
      }
    });
  }

}
