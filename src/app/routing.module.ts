import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {SqlSnippetsComponent} from './sql-snippets/sql-snippets.component';

const routes: Routes = [
  {
    path: '',
    component: SqlSnippetsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'sqlsnippets',
    component: SqlSnippetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
