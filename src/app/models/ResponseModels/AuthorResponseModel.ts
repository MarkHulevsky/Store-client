import { BaseResponseModel } from './BaseResponseModel';
import { Author } from '../Author';

export class AuthorResponseModel extends BaseResponseModel {
    public authors: Author[];
}