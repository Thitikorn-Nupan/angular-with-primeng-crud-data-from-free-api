import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CrudFreeApiComponent} from "./crud/crud-free-api/crud-free-api.component";

const routes: Routes = [
  { path: 'crud-free-api', component: CrudFreeApiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
