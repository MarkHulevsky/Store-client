import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { IUserService } from 'src/app/interfaces/services/IUserService';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {

  public user: User;

  constructor(
    @Inject(UserService) private _userService: IUserService,
    private _router: Router
    ) { 
      this.user = new User;
  }

  ngOnInit(): void {
    this.emailConfirmedCheck();
  }

  public continueBtn(): void{
    this._router.navigate(['home']);
  }

  private async emailConfirmedCheck(): Promise<void>{
    while (!this.user.emailConfirmed){
      this.getCurrentUser();
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  private getCurrentUser(): void {
    this._userService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
    })
  }
}
