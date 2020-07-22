import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { EditProfileDialogComponent } from 'src/app/components/admin/dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { DeleteUserDialogComponent } from 'src/app/components/admin/dialogs/delete-user-dialog/delete-user-dialog.component'; 
import { AddAuthorDialogComponent } from 'src/app/components/admin/dialogs/add-author-dialog/add-author-dialog.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { OrderManagmentComponent } from 'src/app/components/admin/order-managment/order-managment.component';
import { UserManagmentComponent } from 'src/app/components/admin/user-managment/user-managment.component';
import { ProductManagmentComponent } from 'src/app/components/admin/product-managment/product-managment.component';
import { AuthorsPageComponent } from 'src/app/components/admin/authors-page/authors-page.component';
import { DeleteAuthorDialogComponent } from 'src/app/components/admin/dialogs/delete-author-dialog/delete-author-dialog.component';
import { EditAuthorDialogComponent } from 'src/app/components/admin/dialogs/edit-author-dialog/edit-author-dialog.component';
import { RoleGuard } from 'src/app/services/guards/role-guard.service';
import { AddProductDialogComponent } from 'src/app/components/admin/dialogs/add-product-dialog/add-product-dialog.component';
import { PrintingEditionTypeStringToEnumPipe } from 'src/app/helpers/pipes/printingEditionTypeStringToEnum';
import { CurrencyStringToEnumPipe } from 'src/app/helpers/pipes/currencyStringToEnumPipe';

@NgModule({
  declarations: [
    OrderManagmentComponent,
    AddProductDialogComponent,
    UserManagmentComponent,
    ProductManagmentComponent,
    AuthorsPageComponent,
    EditProfileDialogComponent,
    DeleteUserDialogComponent,
    AddAuthorDialogComponent,
    EditAuthorDialogComponent,
    DeleteAuthorDialogComponent,
    PrintingEditionTypeStringToEnumPipe,
    CurrencyStringToEnumPipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    AdministratorRoutingModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [RoleGuard]
})
export class AdministratorModule { }
