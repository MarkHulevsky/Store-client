import { UserStatus } from '../enums/UserStatus'
export class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: UserStatus;
    errors: string[];
}