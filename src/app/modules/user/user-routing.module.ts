import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';


const routes: Routes = [
  { path: "user/profile", component: ProfileComponent, canActivate: [AuthGuard]},
  { path: "user/edit-profile", component: EditProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
