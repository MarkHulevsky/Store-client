import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { Constants } from 'src/app/models/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAdmin: boolean = false;

  constructor(
    private _storageHelper: StorageHelper,
    private _constants: Constants,
    private _router: Router
    ) {
    this.isAdmin = _storageHelper.getItem(_constants.storageRole) === _constants.adminRoleName;
   }

  ngOnInit(): void {

  }

  orderManagment(): void {
    this._router.navigate(["administrator/order-managment"]);
  }

  userManagment(): void {
    this._router.navigate(["administrator/user-managment"]);
  }

  productManagment(): void {
    this._router.navigate(["administrator/product-managment"]);
  }

  authorManagment(): void {
    this._router.navigate(["administrator/authors-page"]);
  }

  myProfile(): void {
    this._router.navigate(["user/profile"]);
  }
}