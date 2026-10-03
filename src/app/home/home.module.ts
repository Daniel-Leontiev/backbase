import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { TransactionsModule } from './transactions/transactions.module';
import { InternationalizationModule } from '../state-management/internationalization/internationalization.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HomeRoutingModule,
    TransactionsModule,
    InternationalizationModule
  ]
})
export class HomeModule { }
