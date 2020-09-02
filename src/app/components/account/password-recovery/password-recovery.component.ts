import { Component, OnInit, Inject } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { IAccountService } from 'src/app/interfaces/services/IAccountService';
import { BaseModel } from 'src/app/models/BaseModel';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  isEmailCorrect: boolean;
  errors: string[];
  email: string;

  constructor(
    private _router: Router,
    @Inject(AccountService) private _accountService: IAccountService
  ) { 
    this.isEmailCorrect = false;
    this.errors = [];
  }

  ngOnInit(): void {
  }

  public continue(): void {
    this._router.navigate(["account/sign-in"]);
  }

  public passwordRecovery(): void {
    this._accountService.forgotPassword(this.email).subscribe((baseModel: BaseModel) => {
      this.errors = baseModel?.errors;
      if (this.errors?.length > 0){
        return;
      }
      this.isEmailCorrect = true;
    });
  }
}
