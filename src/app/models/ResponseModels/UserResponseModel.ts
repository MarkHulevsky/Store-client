import { User } from '../User';
import { BaseResponseModel } from './BaseResponseModel';

export class UserResponseModel extends BaseResponseModel {
    public users: User[] = [];
}