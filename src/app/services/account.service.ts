import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs'
import { LoginModel } from '../models/LoginModel';
import { RegisterModel } from '../models/RegisterModel';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}

  signIn(model: LoginModel): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Account/SignIn`, model);
  }

  signUp(model: RegisterModel): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Account/SignUp`, model);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Account/ForgotPassword`, {email: email});
  }
}