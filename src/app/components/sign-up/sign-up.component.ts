import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/RegisterModel';

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

  private confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ?
      { 'confirmPasswordValid': true } : null
  }


  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = formBuilder.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required]),
    }, { validators: this.confirmPasswordValidator });
  }

  ngOnInit(): void {
  }

  signUp(registerModel) {
    if (this.registerForm.invalid) {
      return;
    }
    this.accountService.signUp(registerModel as RegisterModel).subscribe(data => {
      this.router.navigate(["account/confirm-password"]);
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
