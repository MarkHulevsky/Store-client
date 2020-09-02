import { Injectable } from "@angular/core";

@Injectable()
export class StorageHelper {
    public clear(): void {
        localStorage.clear();
    }

    public getItem(key: string): string {
        return localStorage.getItem(key);
    }

    public setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
}