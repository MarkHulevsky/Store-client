import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { EditProfileModel } from 'src/app/models/EditProfileModel';
import { UserRequestModel } from 'src/app/models/RequestModels/UserRequestModel';
import { UserResponseModel } from 'src/app/models/ResponseModels/UserResponseModel';

export interface IUserService {
    getCurrentUser(): Observable<User>;
    editProfile(editProfileModel: EditProfileModel): Observable<User>;
    getFiltred(userFilter: UserRequestModel): Observable<UserResponseModel>;
    changeStatus(user: User): Observable<User>;
    delete(user: User);
}