import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUserService } from 'src/app/interfaces/services/IUserService';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { IAuthorService } from 'src/app/interfaces/services/IAuthorService';
import { IAuthenticationService } from 'src/app/interfaces/services/IAuthenticationService';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrls: ['./email-confirmed.component.css']
})
export class EmailConfirmedComponent implements OnInit {

  public user: User;
  constructor(
    @Inject(AuthenticationService) private _authService: IAuthenticationService,
    private _router: Router
  ) {
    this.user = new User;
  }

  ngOnInit(): void {
  }

  public continue(): void {
    this._router.navigate(["account/sign-in"]);
  }
}
