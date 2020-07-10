import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Paging } from 'src/app/models/RequestFilters/Paging';
import { UserFilter } from 'src/app/models/RequestFilters/UserFIlter';
import { SortType } from 'src/app/enums/enums';
import { UserResponseFilter } from 'src/app/models/ResponseFilters/UserResponseFilter';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  public paging = new Paging;
  public currentPages: number[] = [];
  public pages: number[] = [];
  public userResponseFilter = new UserResponseFilter;
  public userFilter = new UserFilter;
  public displayedColumns = ['name', 'email', 'status', 'customColumn'];
  public dataSource = new MatTableDataSource<User>();
  public data: User[] = [];
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public pageEvent: PageEvent;

  constructor(
    private userService: UserService
  ) {
    this.sort = new MatSort;
    this.userFilter = {
      propName: "",
      searchString: "",
      sortType: SortType.ascending,
      statuses: [true, false],
      paging: {
        currentPage: 0,
        itemsCount: 10
      }
    };
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.getUsers();
  }

  getUsers() {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.userFilter.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this.userService.getFiltred(this.userFilter);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;
          return data.users;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
        ).subscribe(data => this.data = data);
  }

  delete(user: User) {
    this.userService.delete(user).subscribe();
    let index = this.data.indexOf(user);
    if (index > -1){
      this.data.slice(index, 1);
    }
  }

  changeStatus(user: User) {
    this.userService.changeStatus(user).subscribe();
  }

  searchFilter(event) {
    this.userFilter.searchString = event;
    this.getUsers();
  }

  sortUsers(propName: string){
    this.userFilter.propName = propName;
    this.changeSortType();
    this.getUsers();
  }

  private changeSortType() {
    if (this.userFilter.sortType == SortType.ascending) {
      this.userFilter.sortType = SortType.descending;
      return;
    }
    this.userFilter.sortType = SortType.ascending;
  }
}
