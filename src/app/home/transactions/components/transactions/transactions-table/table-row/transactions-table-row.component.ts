import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LocalizationCurrencyConfig } from '../../../../../../state-management/internationalization/internationalization.config';
import { Transaction } from '../../../../../../state-management/transactions/transactions.model';

@Component({
  selector: 'cmp-transactions-table-row',
  templateUrl: './transactions-table-row.component.html',
  styleUrls: ['./transactions-table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
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
