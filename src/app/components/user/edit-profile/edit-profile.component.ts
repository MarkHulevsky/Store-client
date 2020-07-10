import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, ValidatorFn, FormGroup, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditProfileModel } from 'src/app/models/EditProfileModel';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user: User = new User;
  public editProfileForm: FormGroup;
  public errors: string[] = [];

  private _confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ?
      { 'confirmPasswordValid': true } : null
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {
    this.getProfile();
    this.editProfileForm = this._formBuilder.group({
      'firstName': new FormControl(this.user?.firstName, Validators.required),
      'lastName': new FormControl(this.user?.lastName, Validators.required),
      'email': new FormControl(this.user?.email, [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required]),
    }, { validators: this._confirmPasswordValidator });
  }

  ngOnInit(): void {
  }

  getProfile() {
    this.user.firstName = localStorage.getItem("firstName");
    this.user.lastName = localStorage.getItem("lastName");
    this.user.email = localStorage.getItem("email");
  }

  save(editedUser) {
    this._userService.editProfile(editedUser as EditProfileModel).subscribe((data: User) => {
      this.errors = data?.errors;
      if (this.errors?.length > 0) {
        return;
      }
      this._router.navigate(["user/profile"]);
    });
  }

  cancel() {
    this._router.navigate(["user/profile"]);
  }

  get firstName() {
    return this.editProfileForm.get('firstName');
  }

  get lastName() {
    return this.editProfileForm.get('lastName');
  }

  get email() {
    return this.editProfileForm.get('email');
  }

  get password() {
    return this.editProfileForm.get('password');
  }

  get confirmPassword() {
    return this.editProfileForm.get('confirmPassword');
  }
}
