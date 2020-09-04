import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from 'src/app/components/account/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/components/account/sign-up/sign-up.component';
import { AuthGuard } from 'src/app/services/guards/auth-guard.service';
import { PasswordRecoveryComponent } from 'src/app/components/account/password-recovery/password-recovery.component';
import { ConfirmPasswordComponent } from 'src/app/components/account/confirm-password/confirm-password.component';
import { EmailConfirmedComponent } from 'src/app/components/account/email-confirmed/email-confirmed.component';

const routes: Routes = [
  { path: 'account/sign-in', component: SignInComponent },
  { path: 'account/sign-up', component: SignUpComponent },
  { path: 'account/password-recovery', component: PasswordRecoveryComponent },
  { path: 'account/confirm-password', component: ConfirmPasswordComponent },
  { path: 'account/email-confirmed', component: EmailConfirmedComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
