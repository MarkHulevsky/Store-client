import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { Constants } from 'src/app/models/constants/constants';
import { IUserService } from 'src/app/interfaces/services/IUserService';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { IAuthenticationService } from 'src/app/interfaces/services/IAuthenticationService';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class RoleGuard implements CanActivate {

  private _accessRole: string;
  constructor(
    private _router: Router,
    private _storageHelper: StorageHelper,
    private _constants: Constants,
    @Inject(UserService) private _userService: IUserService,
    @Inject(AuthenticationService) private _authService: IAuthenticationService
  ) {
    this._accessRole = _constants.ADMIN_ROLE_NAME;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    return this._userService.getCurrentUser()
      .pipe(
        map((user: User) => {
          if (user.roles[0] == this._accessRole) {
            return true;
        }
        this._storageHelper.setItem(this._constants.STORAGE_ROLE, this._constants.USER_ROLE_NAME);
        this._authService.userRole.next(user.roles[0]);
        this._router.navigate(["/account/sign-in"]);    
        return false;
        })
      );
}
}
