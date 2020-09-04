import { BaseModel } from './BaseModel';

export class User extends BaseModel {
    public email: string;
    public firstName: string;
    public lastName: string;
    public emailConfirmed: boolean;
    public isActive: boolean;
    public roles: string[];
}