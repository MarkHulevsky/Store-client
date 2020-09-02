import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { IUserService } from 'src/app/interfaces/services/IUserService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User = new User;

  constructor(
    @Inject(UserService) private _userService: IUserService
  ) {
   }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this._userService.getCurrentUser().subscribe((user: User) => this.user = user);
  }
}
