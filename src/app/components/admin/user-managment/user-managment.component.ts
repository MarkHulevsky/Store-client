import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { UserFilter } from 'src/app/models/RequestFilters/UserFIlter';
import { SortType } from 'src/app/enums/enums';
import { UserResponseFilter } from 'src/app/models/ResponseFilters/UserResponseFilter';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Constants } from 'src/app/models/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../dialogs/user-dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { DeleteUserDialogComponent } from '../dialogs/user-dialogs/delete-user-dialog/delete-user-dialog.component';
import { IUserService } from 'src/app/interfaces/services/IUserService';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

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

  constructor(
    @Inject(UserService) private _userService: IUserService,
    private _dialog: MatDialog,
    private _constants: Constants
  ) {
    this.sort = new MatSort;
    this.userFilter = this._constants.userFilter;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.userFilter.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this._userService.getFiltred(this.userFilter);
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
        ).subscribe((data: User[]) => this.data = data);
  }

  delete(user: User): void {
    let dialogRef = this._dialog.open(DeleteUserDialogComponent, {
      width: "300px",
      data: user
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  changeStatus(user: User): void {
    this._userService.changeStatus(user).subscribe();
  }

  searchFilter(event): void {
    this.userFilter.searchString = event;
    this.getUsers();
  }

  sortUsers(propName: string): void {
    this.userFilter.sortPropertyName = propName;
    this.changeSortType();
    this.getUsers();
  }

  editProfile(user: User): void {
    const dialogRef = this._dialog.open(EditProfileDialogComponent, {
      width: "400px",
      data: { 
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

    dialogRef.afterClosed().subscribe((editedUser: User) => {
      let index = this.indexOf(editedUser);
      if (index > -1) {
        this.data[index].email = editedUser.email;
        this.data[index].firstName = editedUser.firstName;
        this.data[index].lastName = editedUser.lastName;
      }
    });
  }

  private changeSortType(): void {
    if (this.userFilter.sortType == SortType.Ascending) {
      this.userFilter.sortType = SortType.Descending;
      return;
    }
    this.userFilter.sortType = SortType.Ascending;
  }

  private indexOf(user: User) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id == user.id ) {
          return i;
      }
  }
  return -1;
  }
}
