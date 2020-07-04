import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs'
import { LoginModel } from '../models/LoginModel';
import { RegisterModel } from '../models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}
 
  hostUrl: string = "http://localhost:5000/api/account/";

  signIn(model: LoginModel): Observable<any> {
    return this.http.post(this.hostUrl + 'SignIn', model);
  }

  signUp(model: RegisterModel): Observable<any> {
    return this.http.post(this.hostUrl + 'SignUp', model);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(this.hostUrl + "ForgotPassword", {email: email});
  }
}