import { User } from '../User';
import { BaseResponseFilter } from './BaseResponseFilter';

export class UserResponseFilter extends BaseResponseFilter {
    public users: User[] = [];
}