import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder } from '@angular/forms'
import { User } from '../../models/User';
import { LoginModel } from '../../models/LoginModel';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user: User = {} as User;
  public loginForm;
  public errors: string[] = [];

  constructor(
    private _accountService: AccountService,
    private _formBuilder: FormBuilder,
    private _router: Router
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
    this._accountService.signIn(loginModel as LoginModel).subscribe(data => {
      this.errors = data.errors;
      if (this.errors?.length > 0)
      {
        this.loginForm.reset();
        return;
      }
      const token = (<any>data).access_token;
      localStorage.setItem("jwt", token);
      this._router.navigate([""]);
    })
  }

  signUpRedirect() {
    this._router.navigate(["account/sign-up"]);
  }
}
