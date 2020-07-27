import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs'
import { User } from '../models/User';
import { EditProfileModel } from '../models/EditProfileModel';
import { UserFilter } from '../models/RequestFilters/UserFIlter';
import { UserResponseFilter } from '../models/ResponseFilters/UserResponseFilter';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/User/GetProfile`);
  }

  editProfile(editProfileModel: EditProfileModel): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/User/EditProfile`, editProfileModel);
  }

  getFiltred(userFilter: UserFilter): Observable<UserResponseFilter> {
    return this.http.post<UserResponseFilter>(`${environment.apiUrl}/api/User/GetFiltred`, userFilter);
  }

  changeStatus(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/User/ChangeStatus`, user);
  }

  delete(user: User) {
    return this.http.delete(`${environment}/api/User/Delete?userId=${user.id}`);
  }
}
