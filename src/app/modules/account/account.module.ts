import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';

import { SignInComponent } from 'src/app/components/account/sign-in/sign-in.component';
import { PasswordRecoveryComponent } from 'src/app/components/account/password-recovery/password-recovery.component';
import { ConfirmPasswordComponent } from 'src/app/components/account/confirm-password/confirm-password.component';
import { SignUpComponent } from 'src/app/components/account/sign-up/sign-up.component';
import { EmailConfirmedComponent } from 'src/app/components/account/email-confirmed/email-confirmed.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PasswordRecoveryComponent,
    ConfirmPasswordComponent,
    EmailConfirmedComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ]
})
export class AccountModule { }
