import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormBuilder, FormControl, Validators, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/RegisterModel';
import { LoginModel } from 'src/app/models/LoginModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieHelper } from 'src/app/helpers/cookie.helper';
import { Constants } from 'src/app/models/constants/constants';
import { IAuthenticationService } from 'src/app/interfaces/services/IAuthenticationService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public user: User;
  public registerForm: FormGroup;
  public errors: string[];
  public registerModel: RegisterModel;

  private _confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ?
      { 'confirmPasswordValid': true } : null
  }


  constructor(
    @Inject(AuthenticationService) private _authenticationService: IAuthenticationService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _cookieHelper: CookieHelper,
    private _constants: Constants
  ) {
    this.user = new User;
    this.registerModel = new RegisterModel;
    this.registerForm = _formBuilder.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required]),
    }, { validators: this._confirmPasswordValidator });
  }

  ngOnInit(): void {
  }

  public signUp(registerModel): void {
    if (this.registerForm.invalid) {
      return;
    }
    this._authenticationService.signUp(registerModel as RegisterModel).subscribe((user: User) => {
      if (user != null && user.errors?.length > 0) {
        this.errors = user.errors;
        return;
      }
      this._router.navigate(["account/confirm-password"]);
    });
  }

  public get firstName() {
    return this.registerForm.get('firstName');
  }

  public get lastName() {
    return this.registerForm.get('lastName');
  }

  public get email() {
    return this.registerForm.get('email');
  }

  public get password() {
    return this.registerForm.get('password');
  }

  public get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
