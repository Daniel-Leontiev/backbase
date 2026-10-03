import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Transaction } from '../../../../../../state-management/transactions/transactions.model';
import { LocalizationCurrencyConfig } from '../../../../../../state-management/internationalization/internationalization.config';

@Component({
  selector: 'cmp-transactions-table-row',
  templateUrl: './transactions-table-row.component.html',
  styleUrls: ['./transactions-table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTableRowComponent {
  @Input() transaction: Transaction;
  @Input() currencyConfig: LocalizationCurrencyConfig;
  @Input() locale: string;
  @Input() merchantLogo: Blob;

  get categoryColor(): string {
    return !this.transaction.categoryCode
      ? '#fbbb1b'
      : this.transaction.categoryCode;
  }
}
