import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { OrderManagmentComponent } from 'src/app/components/admin/order-managment/order-managment.component';
import { UserManagmentComponent } from 'src/app/components/admin/user-managment/user-managment.component';
import { ProductManagmentComponent } from 'src/app/components/admin/product-managment/product-managment.component';
import { AuthorsPageComponent } from 'src/app/components/admin/authors-page/authors-page.component';

@NgModule({
  declarations: [
    OrderManagmentComponent,
    UserManagmentComponent,
    ProductManagmentComponent,
    AuthorsPageComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    AdministratorRoutingModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class AdministratorModule { }
