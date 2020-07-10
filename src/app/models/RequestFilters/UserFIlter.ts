import { BaseFilter } from './BaseFilter';

export class UserFilter extends BaseFilter {
    public propName: string;
    public searchString: string;
    public statuses: boolean[] = [];
}