import { Injectable } from '@angular/core';
import { AuthorFilter } from '../models/RequestFilters/AuthorFilter';
import { Observable } from 'rxjs';
import { AuthorResponseFilter } from '../models/ResponseFilters/AuthorResponseFilter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Author } from '../models/Author';
import { IAuthorService } from '../interfaces/services/IAuthorService';

@Injectable({
  providedIn: 'root'
})
export class AuthorService implements IAuthorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUrl}/api/Author/GetAll`)
  }

  getFiltred(filter: AuthorFilter): Observable<AuthorResponseFilter> {
    return this.http.post<AuthorResponseFilter>(`${environment.apiUrl}/api/Author/GetFiltred`, filter);
  }

  addAuthor(author: Author): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Author/Add`, author);
  }

  deleteAuthor(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/Author/Delete?id=${id}`);
  }

  editAuthor(author: Author): Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/Author/Edit`, author);
  }
}
