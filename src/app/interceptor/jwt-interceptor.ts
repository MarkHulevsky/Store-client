import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CookieHelper } from '../helpers/cookie.helper';
import { Constants } from '../models/constants/constants';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { StorageHelper } from '../helpers/storage.helper';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private _cookieHelper: CookieHelper,
        private _constants: Constants,
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _storageHelper: StorageHelper,
    ) { }

    private setBearer(token: string, request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._cookieHelper.getItem(this._constants.accessToken);

        request = this.setBearer(token, request);
        request = request.clone({
            headers: request.headers.set('Content-Type', 'application/json')
        });

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == this._constants.accessError &&
                    this._cookieHelper.getItem(this._constants.refreshToken)) {
                    return this.refreshToken(token, request, next);
                }
                if (error.status == this._constants.accessError) {
                    this._router.navigate(['/account/sign-in']);
                }
                return throwError(error);
            })
        );
    }

    private refreshToken(token: string, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._authenticationService
            .refreshToken(token, this._cookieHelper.getItem(this._constants.refreshToken))
            .pipe(
                switchMap((data: any) => {
                    this._storageHelper.setItem(this._constants.accessToken, data.accessToken);
                    return next.handle(this.setBearer(data.accessToken, request));
                })
            );
    }
}