import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, ValidatorFn, FormGroup, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditProfileModel } from 'src/app/models/EditProfileModel';
import { IUserService } from 'src/app/interfaces/services/IUserService';
import { StorageHelper } from 'src/app/helpers/storage.helper';

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
    @Inject(UserService) private _userService: IUserService,
    private _router: Router,
  ) {
    this.getProfile().then((user: User) => {
      this.user = user;
      this.editProfileForm = this._formBuilder.group({
        'firstName': new FormControl(this.user?.firstName, Validators.required),
        'lastName': new FormControl(this.user?.lastName, Validators.required),
        'email': new FormControl(this.user?.email, [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
        'confirmPassword': new FormControl('', [Validators.required]),
      }, { validators: this._confirmPasswordValidator });
    });
  }
  
  ngOnInit(): void {
  }

  private async getProfile(): Promise<User> {
    return await this._userService.getCurrentUser().toPromise();
  }

  public save(editedUser: EditProfileModel): void {
    editedUser.id = this.user.id;
    this._userService.editProfile(editedUser as EditProfileModel).subscribe((user: User) => {
      this.errors = user?.errors;
      if (this.errors?.length > 0) {
        return;
      }
      this._router.navigate(["user/profile"]);
    });
  }

  public cancel(): void {
    this._router.navigate(["user/profile"]);
  }

  public get firstName() {
    return this.editProfileForm.get('firstName');
  }

  public get lastName() {
    return this.editProfileForm.get('lastName');
  }

  public get email() {
    return this.editProfileForm.get('email');
  }

  public get password() {
    return this.editProfileForm.get('password');
  }

  public get confirmPassword() {
    return this.editProfileForm.get('confirmPassword');
  }
}
