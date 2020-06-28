import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { tokenGetter } from './auth-guard.service';
import { User } from '../models/User';
import { EditProfileModel } from '../models/EditProfileModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host: string = "http://localhost:5000/api/User/";

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.host + "GetProfile");
  }

  editProfile(editProfileModel: EditProfileModel): Observable<User> {
    return this.http.post<User>(this.host + "EditProfile", editProfileModel);
  }
}
