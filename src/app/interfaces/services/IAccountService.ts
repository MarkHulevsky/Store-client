import { Observable } from 'rxjs';

export interface IAccountService {
    forgotPassword(email: string): Observable<any>;
}