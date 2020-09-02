import { SortType } from '../../enums/enums';
import { Paging } from './Paging';

export class BaseRequestModel {
    public sortType: SortType;
    public paging: Paging;
}