import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InternationalizationModule } from '../state-management/internationalization/internationalization.module';
import { HomeRoutingModule } from './home-routing.module';
import { TransactionsModule } from './transactions/transactions.module';

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
