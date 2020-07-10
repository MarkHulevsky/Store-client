import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder } from '@angular/forms'
import { User } from 'src/app/models/User';
import { LoginModel } from 'src/app/models/LoginModel';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    private _userService: UserService,
    private _accountService: AccountService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) {
    if (localStorage.getItem("rememberMe") !== undefined) {
      if (localStorage.getItem("rememberMe") === "Yes") {
        let token = localStorage.getItem("jwt");
        localStorage.setItem("jwt", token);
        this.setUser();
        _router.navigate([""]);
      }
    }

    this.loginForm = _formBuilder.group({
      email: '',
      password: '',
      isRememberMe: false,
    });
  }

  ngOnInit(): void {
  }

  setUser() {
    this._userService.getCurrentUser().subscribe((data: User) => {
      this.user = data;
      localStorage.setItem("firstName", this.user.firstName);
      localStorage.setItem("lastName", this.user.lastName);
      localStorage.setItem("email", this.user.email);
    });
  }

  signIn(loginModel): void {
    this._accountService.signIn(loginModel as LoginModel).subscribe(data => {
      this.errors = data.errors;
      if (this.errors?.length > 0) {
        this.loginForm.reset();
        return;
      }
      const token = (<any>data).access_token;
      if (this.rememberMe) {
        localStorage.setItem("rememberMe", "Yes");
        localStorage.setItem("jwt", token);
      }
      if (!this.rememberMe) {
        localStorage.setItem("rememberMe", "No");
        localStorage.setItem("jwt", token);
      }
      this.setUser();
      this._router.navigate([""]);
    })
  }

  signUpRedirect() {
    this._router.navigate(["account/sign-up"]);
  }
}
