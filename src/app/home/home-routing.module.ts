import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionsViewComponent } from './transactions/view/transactions-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'transactions',
        component: TransactionsViewComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'transactions'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
