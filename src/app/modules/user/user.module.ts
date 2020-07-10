import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from 'src/app/components/user/profile/profile.component';
import { EditProfileComponent } from 'src/app/components/user/edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
