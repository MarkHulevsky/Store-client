import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  emailIsCorrect: boolean = false;
  errors: string[] = [];
  email: string;

  constructor(
    private _router: Router,
    private _accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  continue() {
    this._router.navigate(["account/sign-in"]);
  }

  passwordRecovery() {
    this._accountService.forgotPassword(this.email).subscribe((data: any) => {
      this.errors = data?.errors;
      if (this.errors?.length > 0){
        return;
      }
      this.emailIsCorrect = true;
    });
  }
}
