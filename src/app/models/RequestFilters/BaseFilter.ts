import { SortType } from '../../enums/enums';
import { Paging } from './Paging';

export class BaseFilter {
    public sortType: SortType;
    public paging: Paging;
}