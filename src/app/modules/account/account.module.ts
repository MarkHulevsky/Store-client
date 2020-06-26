import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { PasswordRecoveryComponent } from 'src/app/components/password-recovery/password-recovery.component';
import { ConfirmPasswordComponent } from 'src/app/components/confirm-password/confirm-password.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PasswordRecoveryComponent,
    ConfirmPasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    ]
})
export class AccountModule { }
