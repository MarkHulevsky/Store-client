import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageHelper } from '../helpers/storage.helper';
import { Constants } from '../models/constants/constants';
import { User } from '../models/User';
import { LoginModel } from '../models/LoginModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { RegisterModel } from '../models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private _http: HttpClient,
    private _storageHelper: StorageHelper,
    private _constants: Constants
  ) { 
  }

  setUserToStorage(user: User) {
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
    return this._http.post(`${environment.apiUrl}/api/Account/RefreshToken`,
     { accessToken: token, refreshToken: refreshToken }, { withCredentials: true });
  }
}
