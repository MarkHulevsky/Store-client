import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {

  user: User = new User();

  constructor(
    private _userService: UserService,
    private _router: Router
    ) { 

  }

  ngOnInit(): void {
    this.emailConfirmedCheck();
  }

  continueBtn(){
    this._router.navigate(['']);
  }

  async emailConfirmedCheck(){
    while (!this.user.emailConfirmed){
      this.getCurrentUser();
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  getCurrentUser() {
    this._userService.getCurrentUser().subscribe((data: User) => {
      this.user = data;
    })
  }
}
