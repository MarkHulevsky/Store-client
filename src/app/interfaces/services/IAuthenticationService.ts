import { User } from 'src/app/models/User';
import { LoginModel } from 'src/app/models/LoginModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { RegisterModel } from 'src/app/models/RegisterModel';

export interface IAuthenticationService {
    userStatusCheck(): void;
    setUserToStorage(user: User): void;
    signIn(model: LoginModel): Observable<User>;
    signUp(model: RegisterModel): Observable<any>;
    refreshToken(token: string, refreshToken: string): Observable<any>;
    signOut(): Observable<any>;
    isAuthorized: BehaviorSubject<boolean>;
    userRole: BehaviorSubject<string>;
}