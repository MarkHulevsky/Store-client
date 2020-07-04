import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { OrderManagmentComponent } from 'src/app/components/order-managment/order-managment.component';
import { UserManagmentComponent } from 'src/app/components/user-managment/user-managment.component';
import { ProductManagmentComponent } from 'src/app/components/product-managment/product-managment.component';
import { AuthorsPageComponent } from 'src/app/components/authors-page/authors-page.component';


@NgModule({
  declarations: [
    OrderManagmentComponent,
    UserManagmentComponent,
    ProductManagmentComponent,
    AuthorsPageComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule
  ]
})
export class AdministratorModule { }
