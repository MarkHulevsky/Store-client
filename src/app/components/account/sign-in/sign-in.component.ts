import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { User } from 'src/app/models/User';
import { LoginModel } from 'src/app/models/LoginModel';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { CookieHelper } from 'src/app/helpers/cookie.helper';
import { Constants } from 'src/app/models/constants/constants';
import { IAuthenticationService } from 'src/app/interfaces/services/IAuthenticationService';

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
    @Inject(AuthenticationService) private _authenticationService: IAuthenticationService,
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

  signIn(loginModel: LoginModel): void {
    this._authenticationService.signIn(loginModel as LoginModel).subscribe((user: User) => {
      if (user.errors?.length > 0) {
        this.errors = user.errors;
        return;
      }
      this._authenticationService.setUserToStorage(user);
      let cookie = this._cookieHelper.getAllCookie();
      localStorage.setItem(this._constants.accessToken, cookie[this._constants.accessToken]);
      this._router.navigate(["home"]);
    });

    if (this.rememberMe) {
      this._storageHelper.setItem(this._constants.storageIsRememberMe, JSON.stringify(true));
      return;
    }
    this._storageHelper.setItem(this._constants.storageIsRememberMe, JSON.stringify(false));
  }

  signUpRedirect(): void {
    this._router.navigate(["account/sign-up"]);
  }
}
