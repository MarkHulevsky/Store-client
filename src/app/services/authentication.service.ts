import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageHelper } from '../helpers/storage.helper';
import { Constants } from '../models/constants/constants';
import { User } from '../models/User';
import { LoginModel } from '../models/LoginModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { RegisterModel } from '../models/RegisterModel';
import { CookieHelper } from '../helpers/cookie.helper';
import { IAuthenticationService } from '../interfaces/services/IAuthenticationService';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  public isAuthorized: BehaviorSubject<boolean>;
  public userRole: BehaviorSubject<string>;
  constructor(
    private _http: HttpClient,
    private _storageHelper: StorageHelper,
    private _constants: Constants,
    private _cookieHelper: CookieHelper
  ) {
    this.userRole = new BehaviorSubject<string>(_constants.userRoleName);
    this.isAuthorized = new BehaviorSubject<boolean>(false);
  }

  userStatusCheck() {
    let isAuthorized = JSON.parse(this._storageHelper.getItem(this._constants.storageIsAutorized));
    let role = this._storageHelper.getItem(this._constants.storageRole);
    this.userRole.next(role);
    this.isAuthorized.next(isAuthorized);
  }

  setUserToStorage(user: User) {
    this.isAuthorized.next(true);
    this.userRole.next(user.roles[0]);
    this._storageHelper.setItem(this._constants.storageIsAutorized, JSON.stringify(true));
    this._storageHelper.setItem(this._constants.storageFirstName, user.firstName);
    this._storageHelper.setItem(this._constants.storageLastName, user.lastName);
    this._storageHelper.setItem(this._constants.storageEmail, user.email);
    this._storageHelper.setItem(this._constants.storageRole, user.roles[0]);
  }

  signIn(model: LoginModel): Observable<User> {
    return this._http.post<User>(`${environment.apiUrl}/api/Account/SignIn`, model, { withCredentials: true });
  }

  signUp(model: RegisterModel): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/Account/SignUp`, model);
  }

  refreshToken(token: string, refreshToken: string): Observable<any> {
    return this._http.post<string>(`${environment.apiUrl}/api/Account/RefreshToken`,
     { accessToken: token, refreshToken: refreshToken }, { withCredentials: true });
  }

  signOut(): Observable<any> {
    this.isAuthorized.next(false);
    this._cookieHelper.deleteAllCookie();
    this._storageHelper.clear();
    return this._http.post(`${environment.apiUrl}/api/Account/SignOut`, {});
  }
}
