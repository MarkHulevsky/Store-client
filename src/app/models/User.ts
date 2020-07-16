import { BaseModel } from './BaseModel';

export class User extends BaseModel {
    public email: string;
    public firstName: string;
    public lastName: string;
    public emailConfirmed: boolean;
    public role: string;
    public isActive: boolean;
}