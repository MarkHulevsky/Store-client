import { UserStatus } from '../enums/UserStatus'
export class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    emailConfirmed: boolean;
    status: UserStatus;
    errors: string[];
}