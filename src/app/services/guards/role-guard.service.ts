import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { Constants } from 'src/app/models/constants/constants';

@Injectable()
export class RoleGuard implements CanActivate {

  private _accessRole: string;
  constructor(
    private _router: Router,
    private _storageHelper: StorageHelper,
    private _constants: Constants
  ) {
    this._accessRole = _constants.adminRoleName;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._storageHelper.getItem(this._constants.storageRole) == this._accessRole) {
        return true;
    }
    this._router.navigate(["/account/sign-in"]);    
    return false;
}
}
