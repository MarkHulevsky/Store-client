import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { tokenGetter } from './auth-guard.service';
import { User } from '../models/User';
import { EditProfileModel } from '../models/EditProfileModel';
import { UserFilter } from '../models/RequestFilters/UserFIlter';
import { UserResponseFilter } from '../models/ResponseFilters/UserResponseFilter';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host: string = "http://localhost:5000/api/User/";

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.host + "GetProfile");
  }

  editProfile(editProfileModel: EditProfileModel): Observable<User> {
    return this.http.post<User>(this.host + "EditProfile", editProfileModel);
  }

  getFiltred(userFilter: UserFilter): Observable<UserResponseFilter> {
    return this.http.post<UserResponseFilter>(this.host + "GetFiltred", userFilter);
  }

  changeStatus(user: User): Observable<User> {
    return this.http.post<User>(this.host + "ChangeStatus", user);
  }

  delete(user: User) {
    return this.http.delete(this.host + `Delete?userId=${user.id}`);
  }
}
