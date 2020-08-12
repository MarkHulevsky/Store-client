import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { Constants } from 'src/app/models/constants/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User = new User;

  constructor(
    private _storageHelper: StorageHelper,
    private _constants: Constants
  ) {
    this.user.firstName = _storageHelper.getItem(_constants.storageFirstName);
    this.user.lastName = _storageHelper.getItem(_constants.storageLastName);
    this.user.email = _storageHelper.getItem(_constants.storageEmail);
   }

  ngOnInit(): void {
  }

}
