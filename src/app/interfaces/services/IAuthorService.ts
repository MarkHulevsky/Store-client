import { Observable } from 'rxjs';
import { Author } from 'src/app/models/Author';
import { AuthorResponseFilter } from 'src/app/models/ResponseFilters/AuthorResponseFilter';
import { AuthorFilter } from 'src/app/models/RequestFilters/AuthorFilter';

export interface IAuthorService {
    getAll(): Observable<Author[]>;
    getFiltred(filter: AuthorFilter): Observable<AuthorResponseFilter>;
    addAuthor(author: Author): Observable<any>;
    deleteAuthor(id: string): Observable<any>;
    editAuthor(author: Author): Observable<any>;
}