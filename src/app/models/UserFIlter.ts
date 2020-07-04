import { UserStatus } from "../enums/enums";
import { BaseFilter } from './BaseFilter';

export class UserFilter extends BaseFilter {
    public propertyName: string;
    public searchString: string;
    public statuses: UserStatus[] = [];
}