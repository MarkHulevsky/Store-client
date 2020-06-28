import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { PasswordRecoveryComponent } from 'src/app/components/password-recovery/password-recovery.component';
import { ConfirmPasswordComponent } from 'src/app/components/confirm-password/confirm-password.component';

const routes: Routes = [
  { path: 'account/sign-in', component: SignInComponent },
  { path: 'account/sign-up', component: SignUpComponent },
  { path: 'account/password-recovery', component: PasswordRecoveryComponent },
  { path: 'account/confirm-password', component: ConfirmPasswordComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
