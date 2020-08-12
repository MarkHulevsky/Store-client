import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UserManagmentComponent } from '../../../user-managment/user-managment.component';
import { UserService } from 'src/app/services/user.service';
import { IUserService } from 'src/app/interfaces/services/IUserService';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<UserManagmentComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    @Inject(UserService) private _userService: IUserService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this._userService.delete(this.user).subscribe(() => {
        this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
