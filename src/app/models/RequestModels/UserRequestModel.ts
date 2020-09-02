import { BaseRequestModel } from './BaseRequestModel';

export class UserRequestModel extends BaseRequestModel {
    public sortPropertyName: string;
    public searchString: string;
    public statuses: boolean[] = [];
}