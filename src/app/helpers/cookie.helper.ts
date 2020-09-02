import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CookieHelper {
    
    constructor(private _cookieService: CookieService) {}

    public deleteAllCookie(): void {
        this._cookieService.deleteAll();
    }

    public getAllCookie() {
        return this._cookieService.getAll();
    }

    public getItem(item: string): string {
        return this._cookieService.get(item);
    }
}