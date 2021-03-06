import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Constants } from 'src/app/models/constants/constants';
import { CookieHelper } from 'src/app/helpers/cookie.helper';
import { UserService } from '../user.service';
import { IUserService } from 'src/app/interfaces/services/IUserService';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';

@Injectable()
export class AuthGuard implements CanActivate {
  
  private _adminRole: string;
  private _token: string;
  constructor(
    private _router: Router,
    private _constants: Constants,
    private _cookieHelper: CookieHelper,
    @Inject(UserService) private _userService: IUserService
    ) {
      this._adminRole = _constants.ADMIN_ROLE_NAME;
      this._token = this._cookieHelper.getItem(this._constants.ACCESS_TOKEN)
  }
  
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._userService.getCurrentUser()
      .pipe(
        map((user: User) => {
          let token = this._cookieHelper.getItem(this._constants.ACCESS_TOKEN);
          if (token && user.emailConfirmed) {
            return true;
          }
          this._router.navigate(["account/sign-in"]);
          return false;
        })
      );
  }
}
