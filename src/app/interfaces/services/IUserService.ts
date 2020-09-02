import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { EditProfileModel } from 'src/app/models/EditProfileModel';
import { UserRequestModel } from 'src/app/models/RequestFilters/UserRequestModel';
import { UserResponseFilter } from 'src/app/models/ResponseFilters/UserResponseFilter';

export interface IUserService {
    getCurrentUser(): Observable<User>;
    editProfile(editProfileModel: EditProfileModel): Observable<User>;
    getFiltred(userFilter: UserRequestModel): Observable<UserResponseFilter>;
    changeStatus(user: User): Observable<User>;
    delete(user: User);
}