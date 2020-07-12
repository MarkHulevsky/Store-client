import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagmentComponent } from '../user-managment/user-managment.component';
import { EditProfileModel } from 'src/app/models/EditProfileModel';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {
  constructor(
    private _router: Router,
    public dialogRef: MatDialogRef<UserManagmentComponent>,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public editProfile: EditProfileModel
  ) { }

  ngOnInit(): void {
  }

  save(editedUser: EditProfileModel) {
    this._userService.editProfile(editedUser).subscribe((data: User) => {
      if (data.errors.length < 1) {
        this.dialogRef.close();
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
