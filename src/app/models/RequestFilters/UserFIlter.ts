import { BaseFilter } from './BaseFilter';

export class UserFilter extends BaseFilter {
    public sortPropertyName: string;
    public searchString: string;
    public statuses: boolean[] = [];
}