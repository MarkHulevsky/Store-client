import { Observable } from 'rxjs';
import { Author } from 'src/app/models/Author';
import { AuthorResponseModel } from 'src/app/models/ResponseModels/AuthorResponseModel';
import { AuthorRequestModel } from 'src/app/models/RequestModels/AuthorRequestModel';

export interface IAuthorService {
    getAll(): Observable<Author[]>;
    getFiltred(filter: AuthorRequestModel): Observable<AuthorResponseModel>;
    addAuthor(author: Author): Observable<any>;
    deleteAuthor(id: string): Observable<any>;
    editAuthor(author: Author): Observable<any>;
}