import { Injectable } from '@angular/core';
import { AuthorFilter } from '../models/RequestFilters/AuthorFilter';
import { Observable } from 'rxjs';
import { AuthorResponseFilter } from '../models/ResponseFilters/AuthorResponseFilter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Author } from '../models/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getFiltred(filter: AuthorFilter): Observable<AuthorResponseFilter> {
    return this.http.post<AuthorResponseFilter>(`${environment.apiUrl}/api/Author/GetFiltred`, filter);
  }

  addAuthor(author: Author): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Author/AddAuthor`, author);
  }

  deleteAuthor(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/Author/DeleteAuthor?id=${id}`);
  }

  editAuthor(author: Author): Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/Author/EditAuthor`, author);
  }
}
