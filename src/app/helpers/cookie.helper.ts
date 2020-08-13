import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CookieHelper {
    
    constructor(private _cookieService: CookieService) {}

    checkСookie(nameParam: string, checkedValue: string): boolean {
        return this._cookieService.get(nameParam) == checkedValue;
    }

    deleteAllCookie(): void {
        this._cookieService.deleteAll();
    }

    getAllCookie() {
        return this._cookieService.getAll();
    }

    getItem(item: string): string {
        return this._cookieService.get(item);
    }
}