import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Paging } from 'src/app/models/Paging';
import { UserFilter } from 'src/app/models/UserFIlter';
import { SortType, UserStatus } from 'src/app/enums/enums';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  public paging = new Paging;
  public users: User[] = [];
  public userFilter = new UserFilter;

  constructor(
    private userService: UserService
  ) {
    this.paging.itemsCount = 6;
    this.paging.currentPage = 0;
    this.userFilter.paging = this.paging;
    this.userFilter.sortType = SortType.ascending;
    this.userFilter.statuses.push(UserStatus.active);
    this.userFilter.statuses.push(UserStatus.blocked);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getFiltred(this.userFilter).subscribe((data: User[]) => {
      this.users = data;
    });
  }

  delete(user: User) {
    debugger
    this.userService.delete(user).subscribe(() => {
      let index = this.users.indexOf(user);
      if (index > -1) {
        this.users.slice(index, 1);
      }
    });
  }

  onToggle(user: User) {
    this.userService.changeStatus(user).subscribe();
  }

  start() {
    this.userFilter.paging.currentPage = 0;
    this.getUsers();
  }

  previous() {
    if (this.userFilter.paging.currentPage > 0) {
      this.userFilter.paging.currentPage--;
      this.getUsers();
    }
  }

  next() {
    this.userFilter.paging.currentPage++;
    this.getUsers();
  }

  end() {

  }
}
