import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder } from '@angular/forms'
import { User } from '../../models/User';
import { LoginModel } from '../../models/LoginModel';
import { Router } from '@angular/router';

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
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email: '',
      password: '',
      isRememberMe: false,
    });
  }

  ngOnInit(): void {
  }

  signIn(loginModel): void {
    this.accountService.signIn(loginModel as LoginModel).subscribe(data => {
      this.errors = data.errors;
      if (this.errors.length > 0)
      {
        this.loginForm.reset();
        return;
      }
      const token = (<any>data).access_token;
      localStorage.setItem("jwt", token);
      this.router.navigate([""]);
    })
  }

  signUpRedirect() {
    this.router.navigate(["account/sign-up"]);
  }
}
