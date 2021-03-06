import { Injectable } from '@angular/core';
import { AuthorRequestModel } from '../models/RequestModels/AuthorRequestModel';
import { Observable } from 'rxjs';
import { AuthorResponseModel } from '../models/ResponseModels/AuthorResponseModel';
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

  getFiltred(filter: AuthorRequestModel): Observable<AuthorResponseModel> {
    return this.http.post<AuthorResponseModel>(`${environment.apiUrl}/api/Author/GetFiltred`, filter);
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
