import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

import { PrintingEditionRoutingModule } from './printing-edition-routing.module';
import { HomeComponent } from 'src/app/components/printing-edition/home/home.component';
import { PipeModule } from '../pipe/pipe.module';
import { PrintingEditionDetailsComponent } from 'src/app/components/printing-edition/printing-edition-details/printing-edition-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    PrintingEditionDetailsComponent
  ],
  imports: [
    CommonModule,
    PrintingEditionRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    PipeModule,
    MatInputModule,
    MatSidenavModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule
  ]
})
export class PrintingEditionModule { }
