import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUserService } from 'src/app/interfaces/services/IUserService';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrls: ['./email-confirmed.component.css']
})
export class EmailConfirmedComponent implements OnInit {

  public user: User;
  constructor(
    @Inject(UserService) private _userService: IUserService,
    private _router: Router
  ) {
    this.user = new User;
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this._userService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
      if (!this.user.emailConfirmed){
        this._router.navigate(['account/confirm-password']);
      }
    })
  }
}
