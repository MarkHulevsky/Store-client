import { Component, OnInit, Inject } from '@angular/core';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { Constants } from 'src/app/models/constants/constants';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IAuthenticationService } from 'src/app/interfaces/services/IAuthenticationService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAdmin: boolean = false;
  public isAuthorized: boolean = false;
  constructor(
    private _storageHelper: StorageHelper,
    private _constants: Constants,
    private _router: Router,
    @Inject(AuthenticationService) private _authService: IAuthenticationService
    ) {
    this.isAdmin = _storageHelper.getItem(_constants.STORAGE_ROLE) === _constants.ADMIN_ROLE_NAME;
    _authService.userStatusCheck();
   }

  ngOnInit(): void {
    this._authService.isAuthorized.subscribe((data: boolean) => {
      this.isAuthorized = data;
    });
    this._authService.userRole.subscribe((role: string) => {
      if (role === this._constants.ADMIN_ROLE_NAME) {
        this.isAdmin = true;
        return;
      }
      this.isAdmin = false;
    });
  }

  public orderManagment(): void {
    this._router.navigate(["administrator/order-managment"]);
  }

  public userManagment(): void {
    this._router.navigate(["administrator/user-managment"]);
  }

  public productManagment(): void {
    this._router.navigate(["administrator/product-managment"]);
  }

  public authorManagment(): void {
    this._router.navigate(["administrator/authors-page"]);
  }

  public myProfile(): void {
    this._router.navigate(["user/profile"]);
  }

  public myOrders(): void {
    this._router.navigate(["orders/myorders"]);
  }

  public logOut(): void {
    this._authService.signOut().subscribe(() => {
      this._router.navigate(["account/sign-in"]);
    });
  }
}