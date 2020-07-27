import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/printing-edition/home/home.component';
import { PrintingEditionDetailsComponent } from 'src/app/components/printing-edition/printing-edition-details/printing-edition-details.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "details/:id" , component: PrintingEditionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintingEditionRoutingModule { }
