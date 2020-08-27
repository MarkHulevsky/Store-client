import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs'
import { environment } from 'src/environments/environment.prod';
import { IAccountService } from '../interfaces/services/IAccountService';
import { BaseModel } from '../models/BaseModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements IAccountService {

  constructor(private _http: HttpClient) {}

  forgotPassword(email: string): Observable<BaseModel> {
    return this._http.post<BaseModel>(`${environment.apiUrl}/api/Account/ForgotPassword`, {email: email});
  }
}