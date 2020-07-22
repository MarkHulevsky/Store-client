import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CookieHelper {
    
    constructor(private _cookieService: CookieService) {}

    setCookieForExpire(nameParam: string[], valueParam: string[], timeExpire: Date | number): void {
        for (let i = 0; i < nameParam.length; i++) {
            this._cookieService.delete(nameParam[i]);
            this._cookieService.set(nameParam[i], valueParam[i], timeExpire);
        }
    }

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