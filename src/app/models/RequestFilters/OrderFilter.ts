import { BaseFilter } from './BaseFilter';
import { Status } from 'src/app/enums/enums';

export class OrderFilter extends BaseFilter {
    public propName: string;
    public orderStatuses: Status[];
}