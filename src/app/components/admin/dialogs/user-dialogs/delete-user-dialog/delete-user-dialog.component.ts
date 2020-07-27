import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UserManagmentComponent } from '../../../user-managment/user-managment.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<UserManagmentComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this._userService.delete(this.user).subscribe((data: User) => {
      if (data.errors.length < 1) {
        this.dialogRef.close();
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
