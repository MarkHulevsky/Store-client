import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { tokenGetter } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host: string = "http://localhost:5000/api/User/";

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    let token = tokenGetter();
    return this.http.get<any>(this.host + "GetProfile", {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` } });
  }

}
