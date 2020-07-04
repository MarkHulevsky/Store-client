import { UserStatus } from '../enums/enums';

export class User {
    public id: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public emailConfirmed: boolean;
    public role: string;
    public status: UserStatus;
    public errors: string[];
}