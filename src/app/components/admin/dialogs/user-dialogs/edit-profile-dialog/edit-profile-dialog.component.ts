import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagmentComponent } from '../../../user-managment/user-managment.component';
import { EditProfileModel } from 'src/app/models/EditProfileModel';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { IUserService } from 'src/app/interfaces/services/IUserService';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  public editProfileForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserManagmentComponent>,
    @Inject(UserService) private _userService: IUserService,
    @Inject(MAT_DIALOG_DATA) public editProfile: EditProfileModel,
    private _formBuilder: FormBuilder
  ) {
     this.editProfileForm = _formBuilder.group({
      'id': new FormControl(editProfile.id),
      'firstName': new FormControl(editProfile.firstName, Validators.required),
      'lastName': new FormControl(editProfile.lastName, Validators.required),
      'email': new FormControl(editProfile.email, [Validators.required, Validators.email]),
     });
   }

  ngOnInit(): void {
  }

  public save(editedUserFrom: FormGroup) {
    if (editedUserFrom.invalid){
      return;
    }
    let editedUser = editedUserFrom.value as EditProfileModel;
      this._userService.editProfile(editedUser).subscribe((user: User) => {
        if (user.errors?.length < 1) {
          this.dialogRef.close(editedUser);
        }
      });
  }

  public cancel() {
    this.dialogRef.close();
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
}
