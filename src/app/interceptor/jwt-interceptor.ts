import { Injectable, Inject } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CookieHelper } from '../helpers/cookie.helper';
import { Constants } from '../models/constants/constants';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { StorageHelper } from '../helpers/storage.helper';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAuthenticationService } from '../interfaces/services/IAuthenticationService';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private _cookieHelper: CookieHelper,
        private _constants: Constants,
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _storageHelper: StorageHelper,
        private _jwtHelperService: JwtHelperService,
        @Inject(AuthenticationService) private _authService: IAuthenticationService 
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._cookieHelper.getItem(this._constants.ACCESS_TOKEN);

        request = this.setBearer(token, request);
        request = request.clone({
            headers: request.headers.set('Content-Type', 'application/json')
        });
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let isExpired: boolean = this._jwtHelperService
                    .isTokenExpired(this._cookieHelper.getItem(this._constants.ACCESS_TOKEN)); 
                let refreshToken = this._cookieHelper.getItem(this._constants.REFRESH_TOKEN);
                let isRememberMe: boolean = JSON.parse(this._storageHelper.getItem(this._constants.STORAGE_IS_REMEMBER_ME));
                if (error.status == this._constants.ACCESS_ERROR && isExpired && refreshToken && isRememberMe) {
                    return this.refreshToken(token, request, next);
                }
                if (error.status == this._constants.ACCESS_ERROR && !isRememberMe) {
                    this._authService.signOut();
                    this._router.navigate(['/account/sign-in']);
                }
                return throwError(error);
            })
        );
    }

    private refreshToken(token: string, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._authenticationService
            .refreshToken(token, this._cookieHelper.getItem(this._constants.REFRESH_TOKEN))
            .pipe(
                switchMap((data: any) => {
                    this._storageHelper.setItem(this._constants.ACCESS_TOKEN, data.accessToken);
                    return next.handle(this.setBearer(data.accessToken, request));
                })
            );
    }

    private setBearer(token: string, request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });

    }
}