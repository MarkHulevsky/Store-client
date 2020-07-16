import { BaseResponseFilter } from './BaseResponseFilter';
import { Author } from '../Author';

export class AuthorResponseFilter extends BaseResponseFilter {
    public authors: Author;
}