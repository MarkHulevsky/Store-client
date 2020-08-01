import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from 'src/app/components/order/order-list/order-list.component';
import { AuthGuard } from 'src/app/services/guards/auth-guard.service';


const routes: Routes = [
  { path: "orders/myorders", component: OrderListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
