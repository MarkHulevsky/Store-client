import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { PrintingEditionRoutingModule } from './printing-edition-routing.module';
import { HomeComponent } from 'src/app/components/printing-edition/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PrintingEditionRoutingModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class PrintingEditionModule { }
