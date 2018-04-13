import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {SqlSnippetsComponent} from './sql-snippets/sql-snippets.component';
import {ScalaSnippetsComponent} from "./scala-snippets/scala-snippets.component";
import {TableBasicExample} from './table-basic/table-basic-example';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'discover',
    component: TableBasicExample
  },
  {
    path: 'sqlsnippets',
    component: SqlSnippetsComponent
  },
  {
    path: 'scalasnippets',
    component: ScalaSnippetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
