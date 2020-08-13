import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthorResponseFilter } from 'src/app/models/ResponseFilters/AuthorResponseFilter';
import { AuthorFilter } from 'src/app/models/RequestFilters/AuthorFilter';
import { Author } from 'src/app/models/Author';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from 'src/app/models/constants/constants';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddAuthorDialogComponent } from '../dialogs/author-dialogs/add-author-dialog/add-author-dialog.component';
import { DeleteAuthorDialogComponent } from '../dialogs/author-dialogs/delete-author-dialog/delete-author-dialog.component';
import { EditAuthorDialogComponent } from '../dialogs/author-dialogs/edit-author-dialog/edit-author-dialog.component';
import { IAuthorService } from 'src/app/interfaces/services/IAuthorService';

@Component({
  selector: 'app-authors-page',
  templateUrl: './authors-page.component.html',
  styleUrls: ['./authors-page.component.css']
})
export class AuthorsPageComponent implements OnInit {

  public authorResponseFilter = new AuthorResponseFilter;
  public authorFilter = new AuthorFilter;
  public displayedColumns = ['name', 'products', 'customColumn'];
  public dataSource = new MatTableDataSource<Author>();
  public data: Author[] = [];
  public resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    @Inject(AuthorService) private _authorService: IAuthorService,
    private _dialog: MatDialog,
    private _constants: Constants
  ) {
    this.sort = new MatSort;
    this.authorFilter = this._constants.authorFilter;
   }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.authorFilter.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this._authorService.getFiltred(this.authorFilter);
        }),
        map(data => {
          this.resultsLength = data.totalCount;
          return data.authors;
        }),
        catchError(() => {
          return of([]);
        })
        ).subscribe((author: Author[]) => {
          this.data = author
        });
  }

  add() {
    this._dialog.open(AddAuthorDialogComponent, {
      width: "400px"
    });
    this._dialog.afterAllClosed.subscribe(() => {
      this.getAuthors();
    });
  }

  delete(author: Author){
    this._dialog.open(DeleteAuthorDialogComponent, {
      width: "300px",
      data: {
        id: author.id,
        name: author.name
      }
    });
    this._dialog.afterAllClosed.subscribe(() => {
      this.getAuthors();
    });
  }

  edit(author: Author) {
    this._dialog.open(EditAuthorDialogComponent, {
      width: "400px",
      data: {
        id: author.id,
        name: author.name
      }
    });
    this._dialog.afterAllClosed.subscribe(() => {
      this.getAuthors();
    });
  }
}
