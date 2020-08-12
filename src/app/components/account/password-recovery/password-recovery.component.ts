import { Component, OnInit, Inject } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { IAccountService } from 'src/app/interfaces/services/IAccountService';

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
    @Inject(AccountService) private _accountService: IAccountService
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
