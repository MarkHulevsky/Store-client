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

  public user: User = {} as User;
  public registerForm;
  public errors: string[];
  public registerModel: RegisterModel = new RegisterModel();

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

  signUp(registerModel) {
    if (this.registerForm.invalid) {
      return;
    }
    this._authenticationService.signUp(registerModel as RegisterModel).subscribe(data => {
      this._authenticationService.signIn(registerModel as LoginModel).subscribe(data => {
        this.errors = data.errors;
        if (this.errors?.length > 0) {
          return;
        }
        this._authenticationService.setUserToStorage(data);
        let cookie = this._cookieHelper.getAllCookie();
        localStorage.setItem(this._constants.accessToken, cookie[this._constants.accessToken]);
        this._router.navigate(["account/confirm-password"]);
      });
    });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
