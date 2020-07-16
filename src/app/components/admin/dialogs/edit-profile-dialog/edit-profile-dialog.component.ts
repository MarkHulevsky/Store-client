import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagmentComponent } from '../../user-managment/user-managment.component';
import { EditProfileModel } from 'src/app/models/EditProfileModel';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  public editProfileForm;
  constructor(
    public dialogRef: MatDialogRef<UserManagmentComponent>,
    private _userService: UserService,
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

  save(editedUserFrom: FormGroup) {
    if (!editedUserFrom.invalid){
      let editedUser = editedUserFrom.value;
      this._userService.editProfile(editedUser as EditProfileModel).subscribe((data: User) => {
        if (data.errors.length < 1) {
          this.dialogRef.close();
        }
      });
    }
  }

  cancel() {
    this.dialogRef.close();
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
}
