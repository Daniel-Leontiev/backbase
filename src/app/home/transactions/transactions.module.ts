import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreControlsModule } from 'src/app/core/controls/core-controls.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InternationalizationModule } from '../../state-management/internationalization/internationalization.module';
import { FormHeaderComponent } from './components/shared/form-header/form-header.component';
import { MerchantLogoComponent } from './components/shared/merchant-logo/merchant-logo.component';
import { TransactionsTableViewComponent } from './components/transactions/transactions-table-view.component';
import { TransactionsTableControlsComponent } from './components/transactions/transactions-table/table-controls/transactions-table-controls.component';
import { TransactionsTableRowComponent } from './components/transactions/transactions-table/table-row/transactions-table-row.component';
import { TransactionsTableComponent } from './components/transactions/transactions-table/transactions-table.component';
import { NewTransferConfirmationFormComponent } from './components/transfer/new-transfer-confirmation-form/new-transfer-confirmation-form.component';
import { NewTransferFormComponent } from './components/transfer/new-transfer-form/new-transfer-form.component';
import { TransferViewComponent } from './components/transfer/transfer-view.component';
import { PageHeaderComponent } from './view/page-header/page-header.component';
import { TransactionsViewComponent } from './view/transactions-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    CoreControlsModule,
    InternationalizationModule
  ],
  declarations: [
    FormHeaderComponent,
    PageHeaderComponent,
    MerchantLogoComponent,

    TransactionsViewComponent,

    TransactionsTableViewComponent,
    TransactionsTableComponent,
    TransactionsTableRowComponent,
    TransactionsTableControlsComponent,

    NewTransferFormComponent,
    NewTransferConfirmationFormComponent,
    TransferViewComponent
  ]
})
export class TransactionsModule {
}
