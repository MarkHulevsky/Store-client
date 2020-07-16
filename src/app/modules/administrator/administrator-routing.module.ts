import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderManagmentComponent } from 'src/app/components/admin/order-managment/order-managment.component';
import { ProductManagmentComponent } from 'src/app/components/admin/product-managment/product-managment.component';
import { AuthorsPageComponent } from 'src/app/components/admin/authors-page/authors-page.component';
import { RoleGuard } from 'src/app/services/guards/role-guard.service';
import { UserManagmentComponent } from 'src/app/components/admin/user-managment/user-managment.component';


const routes: Routes = [
  {
    path: "administrator/order-managment",
    component: OrderManagmentComponent, 
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  { 
    path: "administrator/user-managment", 
    component: UserManagmentComponent, 
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  { 
    path: "administrator/product-managment", 
    component: ProductManagmentComponent, 
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  { 
    path: "administrator/authors-page", 
    component: AuthorsPageComponent, 
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
