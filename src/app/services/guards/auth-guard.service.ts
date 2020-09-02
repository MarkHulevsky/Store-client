import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from 'src/app/models/constants/constants';
import { CookieHelper } from 'src/app/helpers/cookie.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  
  private _adminRole: string;
  private _token: string;
  constructor(
    private _router: Router,
    private _constants: Constants,
    private _cookieHelper: CookieHelper,
    ) {
      this._adminRole = _constants.ADMIN_ROLE_NAME;
      this._token = this._cookieHelper.getItem(this._constants.ACCESS_TOKEN)

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = this._cookieHelper.getItem(this._constants.ACCESS_TOKEN);
    if (token) {
      return true;
    }
    this._router.navigate(["account/sign-in"]);
    return false;
  }
}
