import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User = new User;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this._userService.getCurrentUser().subscribe((data: User) => {
      this.user = data
    });
  }
}
