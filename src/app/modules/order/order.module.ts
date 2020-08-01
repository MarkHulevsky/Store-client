import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from 'src/app/components/order/order-list/order-list.component';
import { PipeModule } from '../pipe/pipe.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    OrderListComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    PipeModule,
    MatTableModule
  ]
})
export class OrderModule { }
