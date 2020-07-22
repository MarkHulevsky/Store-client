import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder } from '@angular/forms'
import { User } from 'src/app/models/User';
import { LoginModel } from 'src/app/models/LoginModel';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { CookieHelper } from 'src/app/helpers/cookie.helper';
import { Constants } from 'src/app/models/constants/constants';
import { constants } from 'buffer';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user: User = {} as User;
  public loginForm;
  public errors: string[] = [];
  public rememberMe: boolean = false;

  constructor(
    private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _storageHelper: StorageHelper,
    private _cookieHelper: CookieHelper,
    private _constants: Constants
  ) {
    this.loginForm = _formBuilder.group({
      email: '',
      password: '',
      isRememberMe: false,
    });
  }

  ngOnInit(): void {
  }

  signIn(loginModel): void {
    this._authenticationService.signIn(loginModel as LoginModel).subscribe((data: User) => {
      if (data.errors?.length > 0) {
        return;
      }
      this._authenticationService.setUserToStorage(data);
      let cookie = this._cookieHelper.getAllCookie();
      localStorage.setItem(this._constants.accessToken, cookie[this._constants.accessToken]);
      this._router.navigate(["home"]);
    });

    if (!this.rememberMe) {
      let cookies = this._cookieHelper.getAllCookie();
      this._cookieHelper.setCookieForExpire(
        [
          this._constants.accessToken,
          this._constants.refreshToken
        ],
        [
          cookies[this._constants.accessToken],
          cookies[this._constants.refreshToken]
        ],
        this._constants.isNotRememberMeDateExpire
      );
    }
  }

  signUpRedirect() {
    this._router.navigate(["account/sign-up"]);
  }
}
